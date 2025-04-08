import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { ModalService } from "@tivic-team/tivic-ui";
import { FormComponenteComponent } from "../form-componentes/form-componentes.component";

@Component({
  selector: "modal-form-create-componente",
  standalone: true,
  imports: [
    ...tableImports,
    FormComponenteComponent
  ],
  styleUrl: "./modal-form-create-componente.component.scss",
  templateUrl: "./modal-form-create-componente.component.html",
})
export class ModalFormCreateComponenteComponent {
  public icon: string = "la la-microchip"
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormCreateComponenteComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }
}
