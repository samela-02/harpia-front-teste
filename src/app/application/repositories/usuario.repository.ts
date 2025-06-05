import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";
import { UsuarioLogadoResponse } from "@/domain/dtos/usuarioLogadoResponse.dto";
import { Usuario } from "@/domain/models/command/usuario";
import { UsuarioFilter } from "@/domain/filters/usuario/usuario.filter";
import { ResponsePaginacao } from "../dtos/response-paginacao.dto";
import { UsuarioQueryResponse } from "@/domain/models/query/usuarioQueryResponse";

export abstract class UsuarioRepository {
  public abstract buscarDadosDeUsuario(): Observable<ResponseData<UsuarioLogadoResponse>>
  public abstract buscarUsuarios(filter?: UsuarioFilter): Observable<ResponseData<ResponsePaginacao<UsuarioQueryResponse>>>
  public abstract criarUsuario(usuario: Usuario): Observable<void>;
  public abstract editarUsuario(cdUsuario: number, usuario: Usuario): Observable<void>;
  public abstract desativarUsuario(cdUsuario: number): Observable<void>;
  public abstract limparCache(): void;
}
