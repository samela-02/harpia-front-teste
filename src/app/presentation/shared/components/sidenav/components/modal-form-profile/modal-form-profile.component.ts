import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, EventEmitter, inject, Output, ViewChild } from "@angular/core";
import { FormUsuarioComponent } from "../form-profile/form-profile.component";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";
import { Store } from "@ngxs/store";
import { UsuarioFilter, UsuarioProps } from "@/domain/filters/usuario/usuario.filter";
import { BuscarUsuariosAction } from "@/infrastructure/store/actions/usuario.actions";

@Component({
  selector: "modal-form-profile",
  standalone: true,
  imports: [
    ...tableImports,
    FormUsuarioComponent
  ],
  styleUrl: "./modal-form-profile.component.scss",
  templateUrl: "./modal-form-profile.component.html",
})
export class ModalFormProfileComponent {
  public icon: string = "la la-industry"
  protected cdUsuario = inject(MODAL_DATA) || null;
  private _modalService = inject(ModalService<ModalFormProfileComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }
}
