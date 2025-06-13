import { Filter } from "@tivic-team/tivic-ui";

export namespace ComponenteType {

  export class cdComponente extends Filter<number> {
    constructor(value: number) {
      super("cdComponente", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class cdTipoComponente extends Filter<number> {
    constructor(value: number) {
      super("cdTipoComponente", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class idComponente extends Filter<string> {
    constructor(value: string) {
      super("idComponente", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class cdEquipamento extends Filter<number> {
    constructor(value: number) {
      super("cdEquipamento", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class idEquipamento extends Filter<string> {
    constructor(value: string) {
      super("idEquipamento", value);
    }

    validate = (): boolean => !!this.value;
  }
  export class nmComponente extends Filter<string> {
    constructor(value: string) {
      super("nmComponente", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class lgAtivo extends Filter<boolean> {
    constructor(value: boolean) {
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

}
