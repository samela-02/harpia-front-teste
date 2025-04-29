import { VeiculoCCOFilter, VeiculoCCOProps } from "@/domain/filters/veiculoCCO/veiculoCCO.filter";
import { BUscarVeiculosCCOAction } from "@/infrastructure/store/actions/veiculo-cco.actions";
import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";
import { FormVeiculoComponent } from "../../../../lista-alertas-page/alertas-page/components/alerta/form-veiculo/form-veiculo.component";
import { FormVeiculoCCOComponent } from "../form-veiculo-cco/form-veiculo-cco.component";

@Component({
  selector: "modal-form-update-veiculo-cco",
  standalone: true,
  imports: [
    ...tableImports,
    FormVeiculoCCOComponent,
    FormVeiculoCCOComponent
],
  styleUrl: "./modal-form-update-veiculo-cco.component.scss",
  templateUrl: "./modal-form-update-veiculo-cco.component.html",
})
export class ModalFormVeiculoCCOUpdateComponent {
  public icon: string = "la la-industry"
  private _store = inject(Store);
  protected veiculo = inject(MODAL_DATA) || null;
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormVeiculoCCOUpdateComponent>);

  ngOnInit(): void {
  }

  fecharModal() {
    this._modalService.dismiss();
  }

  loadTableVeiculoCCO () {
    const paginationProps: VeiculoCCOProps = {
      page: 0,
    };
    const filter = new VeiculoCCOFilter(paginationProps);
    this._store.dispatch(new BUscarVeiculosCCOAction(filter)).subscribe(() => {
    })
  }
}
