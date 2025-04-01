import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, EventEmitter, inject, Output } from "@angular/core";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";
import { FormUsuarioComponent } from "../form-usuario/form-usuario.component";

@Component({
  selector: "modal-form-create-grupo-equipamento",
  standalone: true,
  imports: [
    ...tableImports,
    FormUsuarioComponent
  ],
  styleUrl: "./modal-form-create-usuario.component.scss",
  templateUrl: "./modal-form-create-usuario.component.html",
})
export class ModalFormCreateUsuarioComponent {
  public icon: string = "la la-industry"
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormCreateUsuarioComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }
}
