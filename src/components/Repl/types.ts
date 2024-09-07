import type { Component, ComputedRef, InjectionKey, ToRefs } from 'vue';
import type { Store } from './store';

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
