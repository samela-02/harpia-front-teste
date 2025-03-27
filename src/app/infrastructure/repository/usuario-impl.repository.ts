import { ResponseData } from "@/application/dtos/response-data.dto";
import { UsuarioRepository } from "@/application/repositories/usuario.repository";
import { UsuarioLogadoResponse } from "@/domain/dtos/usuarioLogadoResponse.dto";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class UsuarioRepostoryImpl implements UsuarioRepository {
  private _client = inject(Client);
  private readonly _api = "usuarios";

  buscarDadosDeUsuario(): Observable<ResponseData<UsuarioLogadoResponse>> {
    return this._client.get(`${this._api}/user-info`) as Observable<ResponseData<UsuarioLogadoResponse>>
  }
}
