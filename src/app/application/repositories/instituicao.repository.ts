import { InstituicaoFilter } from "@/domain/filters/instituicao/instituicao.filter";
import { Instituicao } from "@/domain/models/command/instituicao";
import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";

export abstract class InstituicaoRepository {
  public abstract criarInstituicao(instituicao: Instituicao): Observable<ResponseData<Instituicao>>;
  public abstract editarInstituicao(cdInstituicao: number, instituicao: Instituicao): Observable<void>;
  public abstract buscarInstituicoes(filter?: InstituicaoFilter): Observable<ResponseData<ResponsePaginacao<Instituicao>>>
  public abstract desativarInstituicao(cdInstituicao: number): Observable<void>;
}
