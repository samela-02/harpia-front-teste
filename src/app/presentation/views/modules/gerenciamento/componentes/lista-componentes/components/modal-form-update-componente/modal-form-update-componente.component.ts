import { ComponentesFilter, ComponentesProps } from "@/domain/filters/componente/componente.filter";
import { BuscarComponentesAction } from "@/infrastructure/store/actions/componente.actions";
import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";
import { FormComponenteComponent } from "../form-componentes/form-componentes.component";

@Component({
  selector: "modal-form-componente",
  standalone: true,
  imports: [
    ...tableImports,
    FormComponenteComponent
  ],
  styleUrl: "./modal-form-update-componente.component.scss",
  templateUrl: "./modal-form-update-componente.component.html",
})
export class ModalFormComponenteUpdateComponent {
  public icon: string = "la la-microchip"
  private _store = inject(Store);
  protected componente = inject(MODAL_DATA) || null;
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormComponenteUpdateComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }

  loadTableComponente () {
    const paginationProps: ComponentesProps = {
      page: 0,
    };
    const filter = new ComponentesFilter(paginationProps);
    this._store.dispatch(new BuscarComponentesAction(filter)).subscribe(() => {
    })
  }
}
