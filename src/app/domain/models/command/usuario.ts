import { UsuarioRole } from "../../enums/usuario-role.enum";

export class Usuario {
  cdUsuario?: number | null;
  cdInstituicao: number;
  nmLogin: string;
  nmEmail: string;
  nmCargo: string;
  role: UsuarioRole | null;
  nmUsuario: string;
  nmSenha: string | null;
  nmConfirmacaoSenha: string;
  lgAtivo?: number;
  dtDelecao?: Date;

  constructor(
    cdUsuario: number,
    nmLogin: string,
    nmEmail: string,
    nmCargo: string,
    role: UsuarioRole,
    nmUsuario: string,
    nmConfirmacaoSenha: string,
    nmSenha?: string | null,
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
    this.nmSenha = nmSenha;
    this.nmConfirmacaoSenha = nmConfirmacaoSenha;
    this.lgAtivo = lgAtivo;
    this.dtDelecao = dtDelecao;
  }
}
