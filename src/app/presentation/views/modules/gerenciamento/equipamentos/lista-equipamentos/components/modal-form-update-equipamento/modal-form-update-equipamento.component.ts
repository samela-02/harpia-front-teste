import { TipoEquipamentosFilter, TipoEquipamentosProps } from "@/domain/filters/lista-equipamento/tipo-equipamento.filter";
import { BuscarTiposEquipamentosAction } from "@/infrastructure/store/actions/tipo-equipamento.actions";
import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";
import { FormEquipamentoComponent } from "../form-equipamentos/form-equipamentos.component";
import { EquipamentosFilter, EquipamentosProps } from "@/domain/filters/equipamento/equipamento.filter";
import { BuscarEquipamentosAction } from "@/infrastructure/store/actions/equipamento.actions";

@Component({
  selector: "modal-form-equipamento",
  standalone: true,
  imports: [
    ...tableImports,
    FormEquipamentoComponent
  ],
  styleUrl: "./modal-form-update-equipamento.component.scss",
  templateUrl: "./modal-form-update-equipamento.component.html",
})
export class ModalFormEquipamentoUpdateComponent {
  public icon: string = "la la-camera-retro"
  private _store = inject(Store);
  protected equipamento = inject(MODAL_DATA) || null;
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormEquipamentoUpdateComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }

  loadTableEquipamento () {
    const paginationProps: EquipamentosProps = {
      page: 0,
    };
    const filter = new EquipamentosFilter(paginationProps);
    this._store.dispatch(new BuscarEquipamentosAction(filter)).subscribe(() => {
    })
  }
}
