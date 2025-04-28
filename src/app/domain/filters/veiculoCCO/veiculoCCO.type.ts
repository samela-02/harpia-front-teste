import { Filter } from "@tivic-team/tivic-ui";
export namespace VeiculoCCOType {
  export class cdVeiculo extends Filter<number> {
    constructor(value: number) {
      super("cdVeiculo", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class nrPlaca extends Filter<string> {
    constructor(value: string) {
      super("nrPlaca", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class nmMarca extends Filter<string> {
    constructor(value: string) {
      super("nmMarca", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class nmModelo extends Filter<string> {
    constructor(value: string) {
      super("nmModelo", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class corVeiculo extends Filter<string> {
    constructor(value: string) {
      super("corVeiculo", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class lgAtivo extends Filter<number> {
    constructor(value: number) {
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