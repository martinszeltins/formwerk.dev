import type {
  SFCAsyncStyleCompileOptions,
  SFCScriptCompileOptions,
  SFCTemplateCompileOptions,
} from 'vue/compiler-sfc';
import type {
  Component,
  ComputedRef,
  InjectionKey,
  ToRefs,
  UnwrapRef,
} from 'vue';
import type { ImportMap } from './importMap';
import * as defaultCompiler from 'vue/compiler-sfc';

export type EditorMode = 'js' | 'css' | 'ssr';
export interface EditorProps {
  value: string;
  filename: string;
  readonly?: boolean;
  mode?: EditorMode;
}
export interface EditorEmits {
  (e: 'change', code: string): void;
}
export type EditorComponentType = Component<EditorProps>;

export interface Props {
  theme?: 'dark' | 'light';
  previewTheme?: boolean;
  store?: Store;
  height?: number;
  autoResize?: boolean;
  autoSave?: boolean; // auto save and compile, default to true, if false, user need to press ctrl + s to save and compile
  showCompileOutput?: boolean;
  showImportMap?: boolean;
  showTsConfig?: boolean;
  clearConsole?: boolean;
  layout?: 'horizontal' | 'vertical';
  layoutReverse?: boolean;
  ssr?: boolean;
  previewOptions?: {
    headHTML?: string;
    bodyHTML?: string;
    placeholderHTML?: string;
    customCode?: {
      importCode?: string;
      useCode?: string;
    };
    showRuntimeError?: boolean;
    showRuntimeWarning?: boolean;
  };
}

export type OutputModes = 'preview' | EditorMode;

export const injectKeyProps: InjectionKey<ToRefs<Required<Props>>> =
  Symbol('props');

export const injectKeyPreviewRef: InjectionKey<
  ComputedRef<HTMLDivElement | undefined>
> = Symbol('preview-ref');

export interface SFCOptions {
  script?: Partial<SFCScriptCompileOptions>;
  style?: Partial<SFCAsyncStyleCompileOptions>;
  template?: Partial<SFCTemplateCompileOptions>;
}

export type StoreState = ToRefs<{
  files: Record<string, File>;
  activeFilename: string;
  mainFile: string;
  template: {
    welcomeSFC?: string;
    newSFC?: string;
  };
  builtinImportMap: ImportMap;

  // output
  errors: (string | Error)[];
  showOutput: boolean;
  outputMode: OutputModes;
  sfcOptions: SFCOptions;
  /** `@vue/compiler-sfc` */
  compiler: typeof defaultCompiler;
  /* only apply for compiler-sfc */
  vueVersion: string | null;

  // volar-related
  locale: string | undefined;
  typescriptVersion: string;
  /** \{ dependencyName: version \} */
  dependencyVersion: Record<string, string>;
  reloadLanguageTools?: (() => void) | undefined;
}>;

export interface ReplStore extends UnwrapRef<StoreState> {
  activeFile: File;
  /** Loading compiler */
  loading: boolean;
  init(): void;
  setActive(filename: string): void;
  addFile(filename: string | File): void;
  deleteFile(filename: string): void;
  renameFile(oldFilename: string, newFilename: string): void;
  getImportMap(): ImportMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTsConfig(): Record<string, any>;
  serialize(): string;
  deserialize(serializedState: string): void;
  getFiles(): Record<string, string>;
  setFiles(newFiles: Record<string, string>, mainFile?: string): Promise<void>;
}

export type Store = Pick<
  ReplStore,
  | 'files'
  | 'activeFile'
  | 'mainFile'
  | 'errors'
  | 'showOutput'
  | 'outputMode'
  | 'sfcOptions'
  | 'compiler'
  | 'vueVersion'
  | 'locale'
  | 'typescriptVersion'
  | 'dependencyVersion'
  | 'reloadLanguageTools'
  | 'init'
  | 'setActive'
  | 'addFile'
  | 'deleteFile'
  | 'renameFile'
  | 'getImportMap'
  | 'getTsConfig'
>;

export class File {
  compiled = {
    js: '',
    css: '',
    ssr: '',
  };

  constructor(
    public filename: string,
    public code = '',
    public hidden = false,
  ) {}

  get language() {
    if (this.filename.endsWith('.vue')) {
      return 'vue';
    }
    if (this.filename.endsWith('.html')) {
      return 'html';
    }
    if (this.filename.endsWith('.css')) {
      return 'css';
    }
    if (this.filename.endsWith('.ts')) {
      return 'typescript';
    }
    return 'javascript';
  }
}
