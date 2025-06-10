import { BuscarTiposComponentesAction } from "@/infrastructure/store/actions/tipo-componente.actions";
import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";
import { FormTipoComponenteComponent } from "../form-tipos-componentes/form-tipos-componentes.component";
import { TiposComponentesFilter, TiposComponentesProps } from "@/domain/filters/tipo-componente/tipo-componente.filter";
import { TipoComponente } from "@/domain/models/command/tipo-componente";

@Component({
  selector: "modal-form-tipo-componente",
  standalone: true,
  imports: [
    ...tableImports,
    FormTipoComponenteComponent
  ],
  styleUrl: "./modal-form-update-tipo-componente.component.scss",
  templateUrl: "./modal-form-update-tipo-componente.component.html",
})
export class ModalFormTipoComponenteUpdateComponent {
  public icon: string = "la la-microchip"
  private _store = inject(Store);
  protected tipoComponente: TipoComponente = inject(MODAL_DATA) as TipoComponente;
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormTipoComponenteUpdateComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }

  loadTableTipoComponente () {
    const paginationProps: TiposComponentesProps = {
      page: 0,
    };
    const filter = new TiposComponentesFilter(paginationProps);
    this._store.dispatch(new BuscarTiposComponentesAction(filter)).subscribe(() => {
    })
  }
}
