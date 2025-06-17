import { DeteccaoRepository } from "@/application/repositories/deteccao.repository";
import { MovimentacaoDeteccaoQueryResponse } from "@/domain/models/query/movimentacao-deteccao-query-response";
import { Observable } from "rxjs";

export class BuscarMovimentacoesDeteccaoUseCase {
    constructor(private _deteccaoRepository: DeteccaoRepository) {}

    public execute(cdDeteccao: number): Observable<MovimentacaoDeteccaoQueryResponse[]> {
        return this._deteccaoRepository.buscarMovimentacoesDeteccao(cdDeteccao);
    }
}