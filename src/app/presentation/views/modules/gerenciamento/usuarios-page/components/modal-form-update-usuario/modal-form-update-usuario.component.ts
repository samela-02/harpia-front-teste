import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, EventEmitter, inject, Output, ViewChild } from "@angular/core";
import { FormUsuarioComponent } from "../form-usuario/form-usuario.component";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";
import { Store } from "@ngxs/store";
import { UsuarioFilter, UsuarioProps } from "@/domain/filters/usuario/usuario.filter";
import { BuscarUsuariosAction } from "@/infrastructure/store/actions/usuario.actions";

@Component({
  selector: "modal-form-update-usuario",
  standalone: true,
  imports: [
    ...tableImports,
    FormUsuarioComponent
  ],
  styleUrl: "./modal-form-update-usuario.component.scss",
  templateUrl: "./modal-form-update-usuario.component.html",
})
export class ModalFormUsuarioUpdateComponent {
  public icon: string = "la la-industry"
  private _store = inject(Store);
  protected usuario = inject(MODAL_DATA) || null;
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormUsuarioUpdateComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }

  loadTableUsuario () {
    const paginationProps: UsuarioProps = {
      page: 0,
    };
    const filter = new UsuarioFilter(paginationProps);
    this._store.dispatch(new BuscarUsuariosAction(filter)).subscribe(() => {
    })
  }
}
