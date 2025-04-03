import { TipoEquipamentosFilter, TipoEquipamentosProps } from "@/domain/filters/lista-equipamento/tipo-equipamento.filter";
import { BuscarTiposEquipamentosAction } from "@/infrastructure/store/actions/tipo-equipamento.actions";
import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";
import { FormTipoEquipamentoComponent } from "../form-tipos-equipamentos/form-tipos-equipamentos.component";

@Component({
  selector: "modal-form-tipo-equipamento",
  standalone: true,
  imports: [
    ...tableImports,
    FormTipoEquipamentoComponent
  ],
  styleUrl: "./modal-form-update-tipo-equipamento.component.scss",
  templateUrl: "./modal-form-update-tipo-equipamento.component.html",
})
export class ModalFormTipoEquipamentoUpdateComponent {
  public icon: string = "la la-camera-retro"
  private _store = inject(Store);
  protected tipoEquipamento = inject(MODAL_DATA) || null;
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormTipoEquipamentoUpdateComponent>);

  ngOnInit(): void {
    console.log(this.tipoEquipamento)
  }

  fecharModal() {
    this._modalService.dismiss();
  }

  loadTableTipoEquipamento () {
    const paginationProps: TipoEquipamentosProps = {
      page: 0,
    };
    const filter = new TipoEquipamentosFilter(paginationProps);
    this._store.dispatch(new BuscarTiposEquipamentosAction(filter)).subscribe(() => {
    })
  }
}
