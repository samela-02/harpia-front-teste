import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { ListaAlertaRepository } from "@/application/repositories/lista-alerta.repository";
import { ListaAlerta } from "@/domain/models/command/lista-alerta";
import { ListaAlertaResponse } from "@/domain/models/query/lista-alerta-response";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class ListaAlertaRepositoryImpl implements ListaAlertaRepository {

  private _client = inject(Client);
  private readonly _api = "lista-alerta";

  criarListaAlerta(lista: ListaAlerta): Observable<void> {
    return this._client.post(this._api, lista)
   }
  editarListaAlerta(cdListaAlerta: number, listaAlerta: ListaAlerta): Observable<void> {
    return this._client.put(`${this._api}/${cdListaAlerta}`, listaAlerta)
   }
  buscarListaAlertas(): Observable<ResponseData<ResponsePaginacao<ListaAlertaResponse>>> {
    return this._client.get(this._api) as Observable<ResponseData<ResponsePaginacao<ListaAlertaResponse>>>
   }
  desativarListaAlerta(cdListaAlerta: number): Observable<void> {
    return this._client.patch(`${this._api}/${cdListaAlerta}`, null)
   }

}
