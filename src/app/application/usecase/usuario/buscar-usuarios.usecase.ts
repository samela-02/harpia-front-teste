import { Instituicao } from "@/domain/models/command/instituicao";
import { InstituicaoRepository } from "../../repositories/instituicao.repository";
import { Observable } from "rxjs";
import { ResponseData } from "../../dtos/response-data.dto";
import { InstituicaoFilter } from "@/domain/filters/instituicao/instituicao.filter";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { UsuarioRepository } from "@/application/repositories/usuario.repository";
import { Usuario } from "@/domain/models/command/usuario";
import { UsuarioQueryResponse } from "@/domain/models/query/usuarioQueryResponse";

export class BuscarUsuariosUseCase {
  constructor(private usuarioRepository: UsuarioRepository){}

  public execute(filter?: InstituicaoFilter): Observable<ResponseData<ResponsePaginacao<UsuarioQueryResponse>>> {
    return this.usuarioRepository.buscarUsuarios(filter)
  }
}
