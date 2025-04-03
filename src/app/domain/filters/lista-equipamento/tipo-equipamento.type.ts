import { Filter } from "@tivic-team/tivic-ui";

export namespace TipoEquipamentoType {
  export class nmTipoEquipamento extends Filter<string> {
    constructor(value: string) {
      super("nmTipoEquipamento", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class cdTipoEquipamento extends Filter<number> {
    constructor(value: number) {
      super("cdTipoEquipamento", value);
    }

    validate = (): boolean => !!this.value;
  }
  export class lgAtivo extends Filter<boolean> {
    constructor(value: boolean) {
      super("lgAtivo", value);
    }

    validate = (): boolean => !!this.value;
  }
  export class dtDelecao extends Filter<Date> {
    constructor(value: Date) {
      super("dtDelecao", value);
    }

    validate = (): boolean => !!this.value;
  }
}