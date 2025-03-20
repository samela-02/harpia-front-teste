import { environment } from "@env/environment.development";
import { Client, ENVIRONMENT, QuarkClient } from "@tivic-team/tivic-ui";

export const clientProviders = [
    { provide: Client, useClass: QuarkClient },
    { provide: ENVIRONMENT, useValue: environment }
];
