import { ResponseData } from "@/application/dtos/response-data.dto";
import { ResponsePaginacao } from "@/application/dtos/response-paginacao.dto";
import { BuscarUsuariosUseCase } from "@/application/usecase/usuario/buscar-usuarios.usecase";
import { RoleLabel, UsuarioRole } from "@/domain/enums/usuario-role.enum";
import { UsuarioQueryResponse } from "@/domain/models/query/usuarioQueryResponse";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { BuscarUsuariosAction } from "../actions/usuario.actions";

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
