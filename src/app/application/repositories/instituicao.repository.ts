import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { Instituicao } from "@/domain/models/instituicao";
import { InstituicaoFilter } from "@/domain/filters/instituicao.filter";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";

export abstract class InstituicaoRepository {
  public abstract criarInstituicao(instituicao: Instituicao): Observable<ResponseData<Instituicao>>;
  public abstract buscarInstituicoes(filter?: InstituicaoFilter): Observable<ResponseData<ResponsePaginacao<Instituicao[]>>>
}
