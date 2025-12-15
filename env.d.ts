// This file ensures TypeScript understands process.env.API_KEY
// By augmenting the global NodeJS namespace, we add API_KEY to ProcessEnv without redeclaring 'process'.

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      [key: string]: string | undefined;
    }
  }
}

export {};