export interface Environment {
    production: boolean;
    protocol: string;
    host: string;
    port: number;
    context: string;
    apiroot: string;
    version?: string;
}
