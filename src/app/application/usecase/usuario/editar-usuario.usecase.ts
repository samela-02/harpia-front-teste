import { Observable } from "rxjs";
import { UsuarioRepository } from "@/application/repositories/usuario.repository";
import { Usuario } from "@/domain/models/command/usuario";

export class EditarUsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) { }

  public execute(cdInstituicao: number, usuario: Usuario): Observable<void> {
    return this.usuarioRepository.editarUsuario(cdInstituicao,usuario)
  }
}
