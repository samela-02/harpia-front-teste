import { Filter } from "@tivic-team/tivic-ui";

export namespace TipoComponenteType {
  export class nmTipoComponente extends Filter<string> {
    constructor(value: string) {
      super("nmTipoComponente", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class cdTipoComponente extends Filter<number> {
    constructor(value: number) {
      super("cdTipoComponente", value);
    }

    validate = (): boolean => !!this.value;
  }
  export class lgAtivo extends Filter<boolean> {
    constructor(value: boolean) {
      super("lgAtivo", value);
    }

    validate = (): boolean => !!this.value;
  }
  export class dtDelecaoInferior extends Filter<Date> {
    constructor(value: Date) {
      super("dtDelecaoInferior", value);
    }

    validate = (): boolean => !!this.value;
  }
  export class dtDelecaoSuperior extends Filter<Date> {
    constructor(value: Date) {
      super("dtDelecaoSuperior", value);
    }

    validate = (): boolean => !!this.value;
  }
}