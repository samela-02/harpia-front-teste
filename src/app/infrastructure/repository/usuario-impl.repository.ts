import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { UsuarioRepository } from "@/application/repositories/usuario.repository";
import { UsuarioLogadoResponse } from "@/domain/dtos/usuarioLogadoResponse.dto";
import { UsuarioFilter } from "@/domain/filters/usuario/usuario.filter";
import { Usuario } from "@/domain/models/command/usuario";
import { UsuarioQueryResponse } from "@/domain/models/query/usuarioQueryResponse";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class UsuarioRepostoryImpl implements UsuarioRepository {
  private _client = inject(Client);
  private readonly _api = "usuarios";

  buscarDadosDeUsuario(): Observable<ResponseData<UsuarioLogadoResponse>> {
    return this._client.get(`${this._api}/user-info`) as Observable<ResponseData<UsuarioLogadoResponse>>
  }

  buscarUsuarios(filter?: UsuarioFilter): Observable<ResponseData<ResponsePaginacao<UsuarioQueryResponse>>> {
    return this._client.get(this._api, filter?.getFilters()) as Observable<ResponseData<ResponsePaginacao<UsuarioQueryResponse>>>
  }

  criarUsuario(usuario: Usuario): Observable<void> {
    return this._client.post(this._api, usuario)
  }
  editarUsuario(cdUsuario: number, usuario: Usuario): Observable<void> {
    return this._client.put(`${this._api}/${cdUsuario}`, usuario)
  }
  desativarUsuario(cdUsuario: number): Observable<void> {
    return this._client.patch(`${this._api}/${cdUsuario}`, null)
  }
}
