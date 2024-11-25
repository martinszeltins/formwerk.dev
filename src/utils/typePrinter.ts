import * as ts from 'typescript';
import Types from '@formwerk/core/dist/core.d.ts?raw';
// import { transformerTwoslash } from '@shikijs/twoslash';
// import { createHighlighter } from 'shiki';

// const highlighter = await createHighlighter({
//   langs: ['typescript'],
//   themes: ['vitesse-dark'],
// });

const typesSourceFile = {
  fileName: 'types.d.ts',
  source: ts.createSourceFile('types.d.ts', Types, ts.ScriptTarget.Latest),
};

export interface FieldMetadata {
  name: string;
  type: string;
  code: string;
  description: string;
  truncated: boolean;
}

function createTypeChecker(
  files: {
    source: ts.SourceFile;
    fileName: string;
  }[],
) {
  const defaultCompilerHost = ts.createCompilerHost({});
  const customCompilerHost: ts.CompilerHost = {
    getSourceFile: (name, languageVersion) => {
      const file = files.find((s) => s.fileName === name);
      if (file) {
        return file.source;
      }

      return defaultCompilerHost.getSourceFile(name, languageVersion);
    },
    writeFile: () => {},
    getDefaultLibFileName: () => 'lib.d.ts',
    useCaseSensitiveFileNames: () => false,
    getCanonicalFileName: (filename) => filename,
    getCurrentDirectory: () => '',
    getNewLine: () => '\n',
    getDirectories: () => [],
    fileExists: () => true,
    readFile: () => '',
  };

  const program = ts.createProgram(
    files.map((f) => f.fileName),
    {
      emitDeclarationOnly: true,
    },
    customCompilerHost,
  );

  return program.getTypeChecker();
}

function isTypeDeclaration(
  node: ts.Node,
): node is ts.TypeAliasDeclaration | ts.InterfaceDeclaration {
  return ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node);
}

function isFunctionDeclaration(node: ts.Node): node is ts.FunctionDeclaration {
  return ts.isFunctionDeclaration(node);
}

export function extractNamedTypeSignature(typeName: string) {
  const typeChecker = createTypeChecker([typesSourceFile]);

  // Get the declaration for the interface or type alias
  const statement: ts.Statement | undefined =
    typesSourceFile.source.statements.find(
      (s) => isTypeDeclaration(s) && s.name.text === typeName,
    );

  if (!statement) {
    throw new Error(`Type: '${typeName}' not found.`);
  }

  const type: ts.Type = typeChecker.getTypeAtLocation(statement);
  const fields: FieldMetadata[] = [];

  // Iterate over the `ts.Symbol`s representing Property Nodes of `ts.Type`
  for (const prop of type.getProperties()) {
    const name: string = prop.getName();
    const propType: ts.Type = typeChecker.getTypeOfSymbolAtLocation(
      prop,
      statement,
    );
    const propTypeName: string = typeChecker.typeToString(propType);
    const truncatedType = prettifyType(propTypeName);
    // const code = await highlighter.codeToHtml(propTypeName, {
    //   lang: 'typescript',
    //   theme: 'vitesse-dark',
    //   transformers: [transformerTwoslash()],
    // });

    // console.log(code);

    fields.push({
      name,
      type: truncatedType,
      code: '',
      truncated: truncatedType.length > 34,
      description: prop
        .getDocumentationComment(undefined)
        .map((c) => c.text)
        .join(''),
    });
  }

  return {
    typeName,
    fields: fields.sort((a, b) => a.name.localeCompare(b.name)),
  };
}

export function extractFunctionReturnTypeSignature(fnName: string) {
  const typeChecker = createTypeChecker([typesSourceFile]);
  // Get the declaration for the function
  const declaration: ts.FunctionDeclaration | undefined =
    typesSourceFile.source.statements.find(
      (s) => isFunctionDeclaration(s) && s.name?.text === fnName,
    ) as ts.FunctionDeclaration | undefined;

  if (!declaration) {
    throw new Error(`Type: '${fnName}' not found.`);
  }

  const signature = typeChecker.getSignatureFromDeclaration(declaration);
  if (!signature) {
    throw new Error(`Signature: '${fnName}' not found.`);
  }

  const type = typeChecker.getReturnTypeOfSignature(signature);
  const fields: FieldMetadata[] = [];
  // Iterate over the `ts.Symbol`s representing Property Nodes of `ts.Type`
  for (const prop of type.getProperties()) {
    const name: string = prop.getName();
    const propType: ts.Type = typeChecker.getTypeOfSymbol(prop);
    const propTypeName: string = typeChecker.typeToString(propType);
    const truncatedType = prettifyType(propTypeName);

    fields.push({
      name,
      type: truncatedType,
      code: '',
      truncated: truncatedType.length > 34,
      description: prop
        .getDocumentationComment(undefined)
        .map((c) => c.text)
        .join(''),
    });
  }

  return {
    fn: fnName,
    fields: fields.sort((a, b) => a.name.localeCompare(b.name)),
  };
}

function prettifyType(type: string): string {
  if (type.includes('vue.')) {
    type = type.replace('vue.', '');
  }

  if (type.startsWith('<') && type.endsWith('>')) {
    type = type.slice(1, -1);
  }

  // Types to alias
  [['WritableComputedRef', 'Ref']].forEach(([alias, replacement]) => {
    if (type.includes(alias)) {
      type = type.replace(alias, replacement);
    }
  });

  ['Ref', 'ComputedRef', 'ShallowRef'].forEach((refType) => {
    if (type.includes(`${refType}<`)) {
      // Match the first type parameter between < and > or ,
      const match = type.match(new RegExp(`${refType}<([^,>]+)`));
      if (match) {
        type = `${refType}<${match[1]}>`;
      }
    }
  });

  // Remove TS constraints from generic type parameters
  const constraintMatch = type.match(/<\w+\s+extends\s+[^>]+>/);
  if (constraintMatch) {
    const genericName = constraintMatch[0].match(/<(\w+)/)?.[1];
    if (genericName) {
      type = type.replace(constraintMatch[0], `<${genericName}`);
    }
  }

  return type;
}
