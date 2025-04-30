import { UsuarioRole } from '../enums/usuario-role.enum';

export class UsuarioLogadoResponse {
  nmUsuario: string;
  idInstituicao: string;
  cdUsuario: number;
  role: UsuarioRole;
}
