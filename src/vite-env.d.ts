/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_ENDPONT: string;
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
