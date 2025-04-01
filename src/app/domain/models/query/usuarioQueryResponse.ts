import { UsuarioRole } from "../../enums/usuario-role.enum";

export class UsuarioQueryResponse {
  cdUsuario?: number | null;
  cdInstituicao: number;
  nmLogin: string;
  nmEmail: string;
  nmCargo: string;
  role: UsuarioRole | null;
  nmUsuario: string;
  lgAtivo?: number;
  dtDelecao?: Date;

  constructor(
    cdUsuario: number,
    nmLogin: string,
    nmEmail: string,
    nmCargo: string,
    role: UsuarioRole,
    nmUsuario: string,
    cdInstituicao?: number,
    lgAtivo?: number | null,
    dtDelecao?: Date
  ) {
    this.cdUsuario = cdUsuario;
    this.cdInstituicao = cdInstituicao;
    this.nmLogin = nmLogin;
    this.nmEmail = nmEmail;
    this.nmCargo = nmCargo;
    this.role = role;
    this.nmUsuario = nmUsuario;
    this.lgAtivo = lgAtivo;
    this.dtDelecao = dtDelecao;
  }
}
