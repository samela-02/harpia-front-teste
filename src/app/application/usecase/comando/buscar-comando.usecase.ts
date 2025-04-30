import { ComandoRepository } from "@/application/repositories/comando.repository";
import { EventSourceMessage } from "@microsoft/fetch-event-source";
import { Observable } from "rxjs";

export class BuscarComandoUseCase {
  constructor(private comandoRepository: ComandoRepository){}

  public execute(idComando: string): Observable<EventSourceMessage> {
    return this.comandoRepository.buscarComando(idComando);
  }
}