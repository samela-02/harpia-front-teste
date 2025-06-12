import { DeteccaoRepository } from "@/application/repositories/deteccao.repository";
import { DeteccaoRejeitada } from "@/domain/models/command/deteccao/deteccao-rejeitada";

export class RejeitarDeteccaoUseCase {
    constructor(private _deteccaoRepository: DeteccaoRepository) {}

    public execute(deteccaoRejeitada: DeteccaoRejeitada): void {
        this._deteccaoRepository.rejeitarDeteccao(deteccaoRejeitada);
    }
}