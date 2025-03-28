import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormInstituicaoComponent } from "../form-instituicao/form-instituicao.component";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";

@Component({
  selector: "modal-form-create-grupo-equipamento",
  standalone: true,
  imports: [
    ...tableImports,
    FormInstituicaoComponent
  ],
  styleUrl: "./modal-form-create-instituicao.component.scss",
  templateUrl: "./modal-form-create-instituicao.component.html",
})
export class ModalFormCreateInstituicaoComponent {
  public icon: string = "la la-industry"
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormCreateInstituicaoComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }
}
