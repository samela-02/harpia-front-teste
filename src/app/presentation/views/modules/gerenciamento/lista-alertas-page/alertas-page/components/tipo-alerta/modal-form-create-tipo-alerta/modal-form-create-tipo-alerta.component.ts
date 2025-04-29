import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { ModalService } from "@tivic-team/tivic-ui";
import { FormTipoAlertaComponent } from "../form-tipo-alerta/form-tipo-alerta.component";

@Component({
  selector: "modal-form-create-tipo-alerta",
  standalone: true,
  imports: [
    ...tableImports,
    FormTipoAlertaComponent
  ],
  styleUrl: "./modal-form-create-tipo-alerta.component.scss",
  templateUrl: "./modal-form-create-tipo-alerta.component.html",
})
export class ModalFormCreateTipoAlertaComponent {
  public icon: string = "la la-industry"
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormCreateTipoAlertaComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }
}
