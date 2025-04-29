import { Filter } from "@tivic-team/tivic-ui";

export namespace AlertaType {
  export class cdListaAlerta extends Filter<number> {
    constructor(value: number) {
      super("cdListaAlerta", value);
    }
    validate = (): boolean => !!this.value;
  }

  export class nrPlaca extends Filter<string> {
    constructor(value: string) {
      super("nrPlaca", value);
    }
    validate = (): boolean => !!this.value;
  }
}