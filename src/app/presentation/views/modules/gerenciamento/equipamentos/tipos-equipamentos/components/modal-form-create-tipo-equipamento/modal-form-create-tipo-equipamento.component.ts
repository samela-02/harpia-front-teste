import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { ModalService } from "@tivic-team/tivic-ui";
import { FormTipoEquipamentoComponent } from "../form-tipos-equipamentos/form-tipos-equipamentos.component";

@Component({
  selector: "modal-form-create-tipo-equipamento",
  standalone: true,
  imports: [
    ...tableImports,
    FormTipoEquipamentoComponent
  ],
  styleUrl: "./modal-form-create-tipo-equipamento.component.scss",
  templateUrl: "./modal-form-create-tipo-equipamento.component.html",
})
export class ModalFormCreateTipoEquipamentoComponent {
  public icon: string = "la la-stream"
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormCreateTipoEquipamentoComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }
}
