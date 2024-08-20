import { cleanEnv, str, port } from "envalid";

export const validateEnv = () => {
  cleanEnv(process.env, {
    MONGO_URI: str(),
    JWT_SECRET: str(),
    PORT: port({ default: 5000 }),
  });
};
