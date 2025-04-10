import { TipoAlertaFilter, TipoAlertaProps } from "@/domain/filters/tipo-alerta/tipo-alerta.filter";
import { BuscarInstituicoesAction } from "@/infrastructure/store/actions/instituicao.actions";
import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";
import { FormTipoAlertaComponent } from "../form-tipo-alerta/form-tipo-alerta.component";
import { BuscarTiposAlertasAction } from "@/infrastructure/store/actions/tipo-alerta.actions";

@Component({
  selector: "modal-form-update-tipo-alerta",
  standalone: true,
  imports: [
    ...tableImports,
    FormTipoAlertaComponent
  ],
  styleUrl: "./modal-form-update-tipo-alerta.component.scss",
  templateUrl: "./modal-form-update-tipo-alerta.component.html",
})
export class ModalFormTipoAlertaUpdateComponent {
  public icon: string = "la la-folder-open"
  private _store = inject(Store);
  protected tipoAlerta = inject(MODAL_DATA) || null;
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormTipoAlertaUpdateComponent>);

  ngOnInit(): void {
  }

  fecharModal() {
    this._modalService.dismiss();
  }

  loadTableTipoAlerta () {
    const paginationProps: TipoAlertaProps = {
      page: 0,
    };
    const filter = new TipoAlertaFilter(paginationProps);
    this._store.dispatch(new BuscarTiposAlertasAction(filter)).subscribe(() => {
    })
  }
}
