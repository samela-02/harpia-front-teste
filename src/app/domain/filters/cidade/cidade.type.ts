import { Filter } from "@tivic-team/tivic-ui";

export namespace CidadeType {
    export class CdCidade extends Filter<number> {
        constructor(value: number) {
            super("cdCidade", value);
        }
        validate = (): boolean => !!this.value;
    }

    export class CdEstado extends Filter<number> {
        constructor(value: number) {
            super("cdEstado", value);
        }
        validate = (): boolean => !!this.value;
    }

    export class IdCidade extends Filter<string> {
        constructor(value: string) {
            super("idCidade", value);
        }
        validate = (): boolean => !!this.value;
    }

    export class NmCidade extends Filter<string> {
        constructor(value: string) {
            super("nmCidade", value);
        }
        validate = (): boolean => !!this.value;
    }
}