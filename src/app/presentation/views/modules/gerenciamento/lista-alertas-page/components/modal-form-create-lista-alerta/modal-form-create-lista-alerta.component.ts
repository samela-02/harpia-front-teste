import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { ModalService } from "@tivic-team/tivic-ui";
import { FormListaAlertaComponent } from "../form-lista-alerta/form-lista-alerta.component";

@Component({
  selector: "modal-form-create-lista-alerta",
  standalone: true,
  imports: [
    ...tableImports,
    FormListaAlertaComponent
  ],
  styleUrl: "./modal-form-create-lista-alerta.component.scss",
  templateUrl: "./modal-form-create-lista-alerta.component.html",
})
export class ModalFormCreateListaAlertaComponent {
  public icon: string = "la la-industry"
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormCreateListaAlertaComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }
}
