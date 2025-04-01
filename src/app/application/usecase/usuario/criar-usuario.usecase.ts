import { Observable } from "rxjs";
import { UsuarioRepository } from "@/application/repositories/usuario.repository";
import { Usuario } from "@/domain/models/command/usuario";

export class CriarUsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository){}

  public execute(usuario: Usuario): Observable<void> {
    return this.usuarioRepository.criarUsuario(usuario)
  }
}
