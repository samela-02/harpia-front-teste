import { UsuarioRole } from "@/domain/enums/usuario-role.enum";
import { Filter } from "@tivic-team/tivic-ui";

export namespace UsuarioType {
  export class cdUsuario extends Filter<number> {
    constructor(value: number) {
      super("cdUsuario", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class nmUsuario extends Filter<string> {
    constructor(value: string) {
      super("nmUsuario", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class cdInstituicao extends Filter<number> {
    constructor(value: number) {
      super("cdInstituicao", value);
    }

    validate = (): boolean => !!this.value;
  }

  export class role extends Filter<UsuarioRole> {
    constructor(value: UsuarioRole) {
      super("role", value);
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