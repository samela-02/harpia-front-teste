import { Filter } from "@tivic-team/tivic-ui";

export namespace TipoAlertaType {
  export class cdListaAlerta extends Filter<number> {
    constructor(value: number) {
      super("cdListaAlerta", value);
    }
    validate = (): boolean => !!this.value;
  }
}