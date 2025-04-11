import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { ModalService } from "@tivic-team/tivic-ui";
import { FormAlertaComponent } from "../form-alerta/form-alerta.component";

@Component({
  selector: "modal-form-create-alerta",
  standalone: true,
  imports: [
    ...tableImports,
    FormAlertaComponent
  ],
  styleUrl: "./modal-form-create-alerta.component.scss",
  templateUrl: "./modal-form-create-alerta.component.html",
})
export class ModalFormCreateAlertaComponent {
  public icon: string = "la la-exclamation-triangle"
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormCreateAlertaComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }
}
