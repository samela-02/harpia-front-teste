import { ListaAlertaRepository } from "@/application/repositories/lista-alerta.repository";
import { ListaAlerta } from "@/domain/models/command/lista-alerta";
import { Observable } from "rxjs";

export class CriarListaAlertaUseCase {
  constructor(private listaAlertaRepository: ListaAlertaRepository){}

  public execute(listaAlerta: ListaAlerta): Observable<void> {
    return this.listaAlertaRepository.criarListaAlerta(listaAlerta)
  }
}
