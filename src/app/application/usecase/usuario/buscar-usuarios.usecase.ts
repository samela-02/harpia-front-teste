import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { UsuarioRepository } from "@/application/repositories/usuario.repository";
import { UsuarioFilter } from "@/domain/filters/usuario/usuario.filter";
import { UsuarioQueryResponse } from "@/domain/models/query/usuarioQueryResponse";
import { Observable } from "rxjs";
import { ResponseData } from "../../dtos/response-data.dto";

export class BuscarUsuariosUseCase {
  constructor(private usuarioRepository: UsuarioRepository){}

  public execute(filter?: UsuarioFilter): Observable<ResponseData<ResponsePaginacao<UsuarioQueryResponse>>> {
    return this.usuarioRepository.buscarUsuarios(filter)
  }
}
