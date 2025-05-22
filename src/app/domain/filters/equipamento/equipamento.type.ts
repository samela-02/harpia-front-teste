import { Filter } from "@tivic-team/tivic-ui";

export namespace EquipamentoType {
  export class cdTipoEquipamento extends Filter<number> {
    constructor(value: number) {
      super("cdTipoEquipamento", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class idEquipamento extends Filter<string> {
    constructor(value: string) {
      super("idEquipamento", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class cdInstituicao extends Filter<number> {
    constructor(value: number) {
      super("cdInstituicao", value);
    }

    validate = (): boolean => !!this.value;
  }


  export class cdEquipamento extends Filter<number> {
    constructor(value: number) {
      super("cdEquipamento", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class nmEquipamento extends Filter<string> {
    constructor(value: string) {
      super("nmEquipamento", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class nrSerie extends Filter<string> {
    constructor(value: string) {
      super("nrSerie", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class lgAtivo extends Filter<number> {
    constructor(value: number) {
      super("lgAtivo", value);
    }
    validate = (): boolean => !!this.value;
  }
  export class dtDelecaoSuperior extends Filter<Date> {
    constructor(value: Date) {
      super("dtDelecaoSuperior", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class dtDelecaoInferior extends Filter<Date> {
    constructor(value: Date) {
      super("dtDelecaoInferior", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class dtAlocacaoSuperior extends Filter<Date> {
    constructor(value: Date) {
      super("dtAlocacaoSuperior", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class dtAlocacaoInferior extends Filter<Date> {
    constructor(value: Date) {
      super("dtAlocacaoInferior", value);
    }

    validate = (): boolean => !!this.value;
  }
}
