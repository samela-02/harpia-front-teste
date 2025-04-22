import { ListaAlertaRepository } from "@/application/repositories/lista-alerta.repository";
import { Observable } from "rxjs";

export class VincularInstituicaoUseCase {
  constructor(private listaAlertaRepository: ListaAlertaRepository){}

  public execute(cdListaAlerta: number, idInstituicao: string): Observable<void> {
    console.log('fui chamado')
    return this.listaAlertaRepository.vincularInstituicao(cdListaAlerta, idInstituicao)
  }
}
