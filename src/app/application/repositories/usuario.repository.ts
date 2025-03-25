import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { UsuarioLogadoResponse } from "@/domain/dto/usuarioLogadoResponse.dto";

export abstract class UsuarioRepository {
  public abstract buscarDadosDeUsuario(): Observable<ResponseData<UsuarioLogadoResponse>>
}