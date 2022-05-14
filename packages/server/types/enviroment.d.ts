declare namespace NodeJS {
  interface ProcessEnv {
    SECRET: string;
    SERVER_URL: string;
    PORT: number;
    CLIENT_URL: string;
    CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    API_SECRET: string;
  }
}
