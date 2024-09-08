import { computed, version as currentVersion, ref } from 'vue';

export function useVueImportMap(
  defaults: {
    runtimeDev?: string | (() => string);
    runtimeProd?: string | (() => string);
    serverRenderer?: string | (() => string);
    vueVersion?: string | null;
  } = {},
) {
  function normalizeDefaults(defaults?: string | (() => string)) {
    if (!defaults) return;
    return typeof defaults === 'string' ? defaults : defaults();
  }

  const productionMode = ref(false);
  const vueVersion = ref<string | null>(defaults.vueVersion || null);
  const importMap = computed<ImportMap>(() => {
    const vue =
      (!vueVersion.value &&
        normalizeDefaults(
          productionMode.value ? defaults.runtimeProd : defaults.runtimeDev,
        )) ||
      `https://cdn.jsdelivr.net/npm/@vue/runtime-dom@${
        vueVersion.value || currentVersion
      }/dist/runtime-dom.esm-browser${productionMode.value ? `.prod` : ``}.js`;

    const serverRenderer =
      (!vueVersion.value && normalizeDefaults(defaults.serverRenderer)) ||
      `https://cdn.jsdelivr.net/npm/@vue/server-renderer@${
        vueVersion.value || currentVersion
      }/dist/server-renderer.esm-browser.js`;
    return {
      imports: {
        vue,
        'vue/server-renderer': serverRenderer,
      },
    };
  });

  return {
    productionMode,
    importMap,
    vueVersion,
    defaultVersion: currentVersion,
  };
}

export interface ImportMap {
  imports?: Record<string, string | undefined>;
  scopes?: Record<string, Record<string, string>>;
}

export function mergeImportMap(a: ImportMap, b: ImportMap): ImportMap {
  return {
    imports: { ...a.imports, ...b.imports },
    scopes: { ...a.scopes, ...b.scopes },
  };
}

// TODO: Can be probably dynamic based on the package name

const LIB_TYPES_PATH: Record<string, string> = {
  '@formwerk/core': './formwerk-core-types',
};

export function rewriteTypeImports(code: string): string {
  const libImportRE = /import(.+)'@formwerk\/core';$/gm;
  const typeImportRE = /type\s(\w+),?/g;
  const importStatements = code.match(libImportRE);
  if (!importStatements) {
    return code;
  }

  // Find the index of the first import statement so we can inject the type imports right before it
  const index = code.indexOf(importStatements[0]);

  // Collect all the type imports
  const typeImports = new Set<string>();
  for (const match of importStatements) {
    const typeMatch = match.match(typeImportRE);
    if (typeMatch?.length) {
      [...typeMatch].forEach((type) =>
        typeImports.add(type.replace('type ', '').replaceAll(',', '').trim()),
      );
    }
  }

  // Clean up type imports symbols
  code = code.replaceAll(typeImportRE, '');

  // Inject the re-written type imports
  const injectStatement = `import { ${[...typeImports].map((type) => `type ${type}`).join(', ')} } from '${LIB_TYPES_PATH['@formwerk/core']}';\n`;
  code = code.slice(0, index) + injectStatement + code.slice(index);

  return code;
}
