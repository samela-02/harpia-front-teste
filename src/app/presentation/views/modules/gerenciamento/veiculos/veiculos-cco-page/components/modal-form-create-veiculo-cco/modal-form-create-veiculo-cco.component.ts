import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, EventEmitter, inject, Output } from "@angular/core";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";
import { FormVeiculoCCOComponent } from "../form-veiculo-cco/form-veiculo-cco.component";

@Component({
  selector: "modal-form-create-veiculo-cco",
  standalone: true,
  imports: [
    ...tableImports,
    FormVeiculoCCOComponent
  ],
  styleUrl: "./modal-form-create-veiculo-cco.component.scss",
  templateUrl: "./modal-form-create-veiculo-cco.component.html",
})
export class ModalFormCreateVeiculoCCOComponent {
  public icon: string = "la la-industry"
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormCreateVeiculoCCOComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }
}
