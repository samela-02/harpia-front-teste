import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { FormInstituicaoComponent } from "../form-instituicao/form-instituicao.component";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";

@Component({
  selector: "modal-form-grupo-equipamento",
  standalone: true,
  imports: [
    ...tableImports,
    FormInstituicaoComponent
  ],
  styleUrl: "./modal-form-update-instituicao.component.scss",
  templateUrl: "./modal-form-update-instituicao.component.html",
})
export class ModalFormInstituicaoUpdateComponent {
  public icon: string = "la la-industry"
  protected cdInstituicao = inject(MODAL_DATA, { optional: true }) || null;
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormInstituicaoUpdateComponent>);

  ngOnInit(): void {
    console.log(this.cdInstituicao)
  }

  fecharModal() {
    console.log('Tentando fechar modal...');
    this._modalService.dismiss();
    console.log('Modal dismiss chamado');
  }
}
