import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { BuscarInstituicoesUseCase } from "@/application/usecase/instituicao/buscar-instituicoes.usecase";
import { Instituicao } from "@/domain/models/command/instituicao";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { BuscarInstituicoesAction } from "../actions/instituicao.actions";
import { Observable, tap } from "rxjs";
import { Usuario } from "@/domain/models/command/usuario";
import { BuscarUsuariosUseCase } from "@/application/usecase/usuario/buscar-usuarios.usecase";
import { BuscarUsuariosAction } from "../actions/usuario.actions";
import { UsuarioQueryResponse } from "@/domain/models/query/usuarioQueryResponse";
import { RoleLabel, UsuarioRole } from "@/domain/enums/usuario-role.enum";

export class UsuarioStateModel {
   usuarios: ResponseData<ResponsePaginacao<UsuarioQueryResponse>> | null;
}

@State<UsuarioStateModel>({
  name: "usuarios",
  defaults: {
    usuarios: null
  }
})

@Injectable()
export class UsuarioState {
  constructor(private buscarUsuariosUseCase: BuscarUsuariosUseCase) {}

  @Action(BuscarUsuariosAction)
  buscarUsuarios({ getState, setState }: StateContext<UsuarioStateModel>,
    { payload }: BuscarUsuariosAction): Observable<ResponseData<ResponsePaginacao<UsuarioQueryResponse>>> {
    return this.buscarUsuariosUseCase.execute(payload).pipe(
      tap((response: ResponseData<ResponsePaginacao<UsuarioQueryResponse>>) => {
        response.data.dados.forEach((usuario) => {
          usuario.role = RoleLabel.get(usuario.role) as UsuarioRole
        });
        const state = getState();
        setState({
          ...state,
          usuarios: response,
        });
      }),
    );
  }
}
