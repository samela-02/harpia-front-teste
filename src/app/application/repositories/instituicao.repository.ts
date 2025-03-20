import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { Instituicao } from "@/domain/model/instituicao";

export abstract class InstituicaoRepository {
  public abstract criarInstituicao(instituicao: Instituicao): Observable<ResponseData<Instituicao>>;
}
