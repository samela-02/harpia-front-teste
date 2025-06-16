import { DeteccaoRepository } from "@/application/repositories/deteccao.repository";
import { ObservacaoDeteccao } from "@/domain/models/command/deteccao/observacao-deteccao";
import { Observable } from "rxjs";

export class AdicionarObservacaoDeteccaoUseCase {
    constructor(private deteccaoRepository: DeteccaoRepository) {}

    public execute(observacaoDeteccao: ObservacaoDeteccao): Observable<void> {
        return this.deteccaoRepository.adicionarObservacao(observacaoDeteccao);
    }
}