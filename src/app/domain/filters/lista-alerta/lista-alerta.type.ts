import { Filter } from "@tivic-team/tivic-ui";

export namespace ListaAlertaType {
  export class idInstituicao extends Filter<string> {
    constructor(value: string) {
      super("idInstituicao", value);
    }

    validate = (): boolean => !!this.value;
  }
}