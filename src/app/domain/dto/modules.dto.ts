import { contentModule } from "../interface/content-modules.interface";

export class Modules {
  name: string;
  label: string;
  icon?: string;
  enabled: boolean;
  routerLink: string
  features?: contentModule[];
}