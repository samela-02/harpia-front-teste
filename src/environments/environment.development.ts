import packageInfo from "../../package.json";
import { Environment } from "./interfaces/environment.interface";

export const environment: Environment = {
  production: true,
  protocol: "http",
  apiroot: "v1",
  host: "192.168.1.130",
  port: 8091,
  context: "api",
  version: packageInfo.version,
};
