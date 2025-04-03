import { ListaAlertaRepository } from "@/application/repositories/lista-alerta.repository";
import { Observable } from "rxjs";

export class DesativarListaAlertaUseCase {
  constructor(private listaAlertaRepository: ListaAlertaRepository){}

  public execute(cdListaAlerta: number): Observable<void> {
    return this.listaAlertaRepository.desativarListaAlerta(cdListaAlerta)
  }
}
