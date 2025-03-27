import { Filter } from "@tivic-team/tivic-ui";

export namespace InstituicaoType {
  export class nmInstituicao extends Filter<string> {
    constructor(value: string) {
      super("nmInstituicao", value);
    }

    validate = (): boolean => !!this.value;
  }
  export class cdInstituicao extends Filter<number> {
    constructor(value: number) {
      super("cdInstituicao", value);
    }

    validate = (): boolean => !!this.value;
  }
  export class lgAtivo extends Filter<boolean> {
    constructor(value: boolean) {
      super("lgAtivo", value);
    }

    validate = (): boolean => !!this.value;
  }
}