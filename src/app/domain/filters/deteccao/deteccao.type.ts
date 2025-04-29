import { Filter } from "@tivic-team/tivic-ui";

export namespace DeteccaoType {
  export class cdDeteccao extends Filter<number> {
    constructor(value: number) {
      super("cdDeteccao", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class cdEquipamento extends Filter<number> {
    constructor(value: number) {
      super("cdEquipamento", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class vlConfidenceAlprInferior extends Filter<number> {
    constructor(value: number) {
      super("vlConfidenceAlprInferior", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class vlConfidenceAlprSuperior extends Filter<number> {
    constructor(value: number) {
      super("vlConfidenceAlprSuperior", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class dtDeteccaoInferior extends Filter<Date> {
    constructor(value: Date) {
      super("dtDeteccaoInferior", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class dtDeteccaoSuperior extends Filter<Date> {
    constructor(value: Date) {
      super("dtDeteccaoSuperior", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class nmPiv extends Filter<string> {
    constructor(value: string) {
      super("nmPiv", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class nrPlaca extends Filter<string> {
    constructor(value: string) {
      super("nrPlaca", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class vlConfidencePivInferior extends Filter<number> {
    constructor(value: number) {
      super("vlConfidencePivInferior", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class vlConfidencePivSuperior extends Filter<number> {
    constructor(value: number) {
      super("vlConfidencePivSuperior", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class lgAtivo extends Filter<number> {
    constructor(value: number) {
      super("lgAtivo", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class cdInstituicao extends Filter<number> {
    constructor(value: number) {
      super("cdInstituicao", value);
    }
    validate = (): boolean => !!this.value;
  }
}
