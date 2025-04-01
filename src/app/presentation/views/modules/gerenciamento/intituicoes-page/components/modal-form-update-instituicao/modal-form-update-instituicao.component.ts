import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, EventEmitter, inject, Output, ViewChild } from "@angular/core";
import { FormInstituicaoComponent } from "../form-instituicao/form-instituicao.component";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";
import { Store } from "@ngxs/store";
import { BuscarInstituicoesAction } from "@/infrastructure/store/actions/instituicao.actions";
import { InstituicaoFilter, InstituicaoProps } from "@/domain/filters/instituicao/instituicao.filter";

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
  private _store = inject(Store);
  protected instituicao = inject(MODAL_DATA) || null;
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormInstituicaoUpdateComponent>);

  ngOnInit(): void {
  }

  fecharModal() {
    this._modalService.dismiss();
  }

  loadTableInstituicao () {
    const paginationProps: InstituicaoProps = {
      page: 0,
    };
    const filter = new InstituicaoFilter(paginationProps);
    this._store.dispatch(new BuscarInstituicoesAction(filter)).subscribe(() => {
    })
  }
}
