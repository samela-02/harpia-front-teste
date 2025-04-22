import { ListaAlertaFilter, ListaAlertaProps } from "@/domain/filters/lista-alerta/lista-alerta.filter";
import { BuscarInstituicoesAction } from "@/infrastructure/store/actions/instituicao.actions";
import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, inject } from "@angular/core";
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from "@ngxs/store";
import { MODAL_DATA, ModalService } from "@tivic-team/tivic-ui";
import { FormListaAlertaComponent } from "../form-lista-alerta/form-lista-alerta.component";
import { TableInstituicoesVinculadasComponent } from "./components/table-instituicoes-vinculadas/table-instituicoes-vinculadas.component";

@Component({
  selector: "modal-form-update-lista-alerta",
  standalone: true,
  imports: [
    ...tableImports,
    FormListaAlertaComponent,
    TableInstituicoesVinculadasComponent,
    MatTabsModule
  ],
  styleUrl: "./modal-form-update-lista-alerta.component.scss",
  templateUrl: "./modal-form-update-lista-alerta.component.html",
})
export class ModalFormListaAlertaUpdateComponent {
  public icon: string = "la la-folder-open"
  private _store = inject(Store);
  protected listaAlerta: any = inject(MODAL_DATA) || null;
  public tituloModal: string;
  private _modalService = inject(ModalService<ModalFormListaAlertaUpdateComponent>);

  ngOnInit(): void {
    console.log(this.listaAlerta.cdListaAlerta)
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
