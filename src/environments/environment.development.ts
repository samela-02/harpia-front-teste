import packageInfo from "../../package.json";
import { Environment } from "./interfaces/environment.interface";

export const environment: Environment = {
  production: true,
  protocol: "http",
  apiroot: "v1",
  host: "localhost",
  port: 8080,
  context: "api",
  version: packageInfo.version,
};
