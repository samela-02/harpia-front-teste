import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { ModalService } from "@tivic-team/tivic-ui";
import { FormTipoComponenteComponent } from "../form-tipos-componentes/form-tipos-componentes.component";

@Component({
  selector: "modal-form-create-tipo-componente",
  standalone: true,
  imports: [
    ...tableImports,
    FormTipoComponenteComponent
  ],
  styleUrl: "./modal-form-create-tipo-componente.component.scss",
  templateUrl: "./modal-form-create-tipo-componente.component.html",
})
export class ModalFormCreateTipoComponenteComponent {
  public icon: string = "la la-stream"
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormCreateTipoComponenteComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }
}
