import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, EventEmitter, inject, Output, ViewChild } from "@angular/core";
import { FormListaAlertaComponent } from "../form-lista-alerta/form-lista-alerta.component";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";
import { Store } from "@ngxs/store";
import { BuscarInstituicoesAction } from "@/infrastructure/store/actions/instituicao.actions";
import { ListaAlertaFilter, ListaAlertaProps } from "@/domain/filters/lista-alerta/lista-alerta.filter";

@Component({
  selector: "modal-form-update-lista-alerta",
  standalone: true,
  imports: [
    ...tableImports,
    FormListaAlertaComponent
  ],
  styleUrl: "./modal-form-update-lista-alerta.component.scss",
  templateUrl: "./modal-form-update-lista-alerta.component.html",
})
export class ModalFormListaAlertaUpdateComponent {
  public icon: string = "la la-folder-open"
  private _store = inject(Store);
  protected listaAlerta = inject(MODAL_DATA) || null;
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormListaAlertaUpdateComponent>);

  ngOnInit(): void {
  }

  fecharModal() {
    this._modalService.dismiss();
  }

  loadTableListaAlerta () {
    const paginationProps: ListaAlertaProps = {
      page: 0,
    };
    const filter = new ListaAlertaFilter(paginationProps);
    this._store.dispatch(new BuscarInstituicoesAction(filter)).subscribe(() => {
    })
  }
}
