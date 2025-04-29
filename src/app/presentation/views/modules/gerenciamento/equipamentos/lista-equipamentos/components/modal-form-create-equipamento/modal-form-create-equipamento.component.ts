import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { ModalService } from "@tivic-team/tivic-ui";
import { FormEquipamentoComponent } from "../form-equipamentos/form-equipamentos.component";

@Component({
  selector: "modal-form-create-equipamento",
  standalone: true,
  imports: [
    ...tableImports,
    FormEquipamentoComponent
  ],
  styleUrl: "./modal-form-create-equipamento.component.scss",
  templateUrl: "./modal-form-create-equipamento.component.html",
})
export class ModalFormCreateEquipamentoComponent {
  public icon: string = "la la-camera-retro"
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormCreateEquipamentoComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }
}
