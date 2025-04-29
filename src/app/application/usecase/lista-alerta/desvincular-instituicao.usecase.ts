import { ListaAlertaRepository } from "@/application/repositories/lista-alerta.repository";
import { Observable } from "rxjs";

export class DesvincularInstituicaoUseCase {
  constructor(private listaAlertaRepository: ListaAlertaRepository){}

  public execute(cdListaAlerta: number, idInstituicao: string): Observable<void> {
    return this.listaAlertaRepository.desvincularInstituicao(cdListaAlerta, idInstituicao)
  }
}
