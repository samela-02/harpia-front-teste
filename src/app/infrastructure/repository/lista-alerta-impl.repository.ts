import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { ListaAlertaRepository } from "@/application/repositories/lista-alerta.repository";
import { ListaAlertaFilter } from "@/domain/filters/lista-alerta/lista-alerta.filter";
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

  buscarListaAlertas(filter?: ListaAlertaFilter): Observable<ResponseData<ResponsePaginacao<ListaAlertaResponse>>> {
    return this._client.get(this._api, filter?.getFilters()) as Observable<ResponseData<ResponsePaginacao<ListaAlertaResponse>>>
  }

  desativarListaAlerta(cdListaAlerta: number): Observable<void> {
    return this._client.patch(`${this._api}/${cdListaAlerta}`, null)
  }

  vincularInstituicao(cdListaAlerta: number, idInstituicao: string): Observable<void> {
    console.log('josjos')
    return this._client.post(`${this._api}/${cdListaAlerta}/instituicoes/${idInstituicao}`, null)
  }

  desvincularInstituicao(cdListaAlerta: number, idInstituicao: string): Observable<void> {
    return this._client.delete(`${this._api}/${cdListaAlerta}/instituicoes/${idInstituicao}`, null)
  }
}
