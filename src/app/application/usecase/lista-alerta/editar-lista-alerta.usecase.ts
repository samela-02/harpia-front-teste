import { ListaAlertaRepository } from "@/application/repositories/lista-alerta.repository";
import { ListaAlerta } from "@/domain/models/command/lista-alerta";
import { Observable } from "rxjs";

export class EditarListaAlertaUseCase {
  constructor(private listaAlertaRepository: ListaAlertaRepository){}

  public execute(cdListaAlerta: number, listaAlerta: ListaAlerta): Observable<void> {
    return this.listaAlertaRepository.editarListaAlerta(cdListaAlerta, listaAlerta)
  }
}
