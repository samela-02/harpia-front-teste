import { Feature } from "./feature.interface";

export interface Module {
    name?: string;
    icon?: string;
    enabled?: boolean;
    routerLink: string;
    permissions?: Array<string>;
    default?: boolean;
    features?: Array<Feature>;
}
