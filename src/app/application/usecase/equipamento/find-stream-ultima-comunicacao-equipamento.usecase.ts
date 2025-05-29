import { EquipamentoRepository } from "@/application/repositories/equipamento.repository";
import { EventSourceMessage } from "@microsoft/fetch-event-source";
import { Observable } from "rxjs";

export class FindStreamUltimaComunicacaoEquipamentoUseCase {
    constructor(private _equipamentoRepository: EquipamentoRepository) {}

    public execute(abortController: AbortController): Observable<EventSourceMessage> {
        return this._equipamentoRepository.findStreamUltimaComunicacaoEquipamento(abortController);
    }
}