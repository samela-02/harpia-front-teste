import { Observable } from "rxjs";
import { UsuarioRepository } from "@/application/repositories/usuario.repository";

export class DesativarUsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) { }

  public execute(cdInstituicao: number): Observable<void> {
    return this.usuarioRepository.desativarUsuario(cdInstituicao)
  }
}
