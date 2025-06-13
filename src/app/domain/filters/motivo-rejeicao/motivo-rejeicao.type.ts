import { Filter } from "@tivic-team/tivic-ui";

export namespace MotivoRejeicaoType {
    export class CdMotivoRejeicao extends Filter<number> {
        constructor(value: number) {
            super("cdMotivoRejeicao", value);
        }
        validate = (): boolean => !!this.value;
    }

    export class DsMotivoRejeicao extends Filter<string> {
        constructor(value: string) {
            super("dsMotivoRejeicao", value);
        }
        validate = (): boolean => !!this.value;
    }

    export class LgAtivo extends Filter<number> {
        constructor(value: number) {
            super("lgAtivo", value);
        }
        validate = (): boolean => !!this.value;
    }
}