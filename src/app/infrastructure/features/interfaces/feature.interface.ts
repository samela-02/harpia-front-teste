export interface Feature {
    id: string;
    label: string;
    icon?: string;
    routerLink?: string;
    enabled?: boolean;
    childrens?: Feature[];
}
