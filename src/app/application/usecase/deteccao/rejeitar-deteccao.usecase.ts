import { DeteccaoRepository } from "@/application/repositories/deteccao.repository";
import { DeteccaoRejeitada } from "@/domain/models/command/deteccao/deteccao-rejeitada";
import { Observable } from "rxjs";

export class RejeitarDeteccaoUseCase {
    constructor(private _deteccaoRepository: DeteccaoRepository) {}

    public execute(deteccaoRejeitada: DeteccaoRejeitada): Observable<void> {
        return this._deteccaoRepository.rejeitarDeteccao(deteccaoRejeitada);
    }
}