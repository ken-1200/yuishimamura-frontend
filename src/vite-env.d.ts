/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_ENDPONT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
