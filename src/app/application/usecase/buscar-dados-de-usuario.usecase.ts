import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { UsuarioLogadoResponse } from "@/domain/dto/usuarioLogadoResponse.dto";
import { UsuarioRepository } from "../repositories/usuario.repository";

export class BuscarDadosDeUsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository){}

  execute(): Observable<ResponseData<UsuarioLogadoResponse>>{
    return this.usuarioRepository.buscarDadosDeUsuario()
  }
}