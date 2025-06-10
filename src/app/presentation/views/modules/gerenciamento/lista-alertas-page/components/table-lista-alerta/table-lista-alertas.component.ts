import { ListaAlertaFilter, ListaAlertaProps } from '@/domain/filters/lista-alerta/lista-alerta.filter';
import { ListaAlerta } from '@/domain/models/command/lista-alerta';
import { TablePageBase } from '@/infrastructure/configuration/table-config/table-page.config';
import { SetarBreadcrumbAction } from '@/infrastructure/store/actions/breadcrumb.action';
import { BuscarListaAlertaAction } from '@/infrastructure/store/actions/lista-alerta.actions';
import { ListaAlertaSelectors } from '@/infrastructure/store/selectors/lista-alerta.selectors';
import { NoTableComponent } from '@/presentation/shared/components/no-table/no-table.component';
import { tableModule } from '@/presentation/shared/table.module';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { Store } from '@ngxs/store';
import { ModalService } from '@tivic-team/tivic-ui';
import { ModalOptionsComponent } from '../modal-options/modal-options.component';

@Component({
  selector: 'app-table-lista-alertas',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule, NoTableComponent],
  templateUrl: './table-lista-alertas.component.html',
  styleUrl: './table-lista-alertas.component.scss'
})

export class TableListaAlertasComponent extends TablePageBase{
  private _store = inject(Store);
  private _modalService = inject(ModalService<ModalOptionsComponent>);
  public listaAlertas = this._store.selectSignal(ListaAlertaSelectors.listaAlerta);
  override currentFilters?: ListaAlertaProps;

  dataLength = 0

  ngOnInit(): void {
    this.load();
  }

  public load(filters?: ListaAlertaProps, page: number = 0) {
    if (filters) {
      this.currentFilters = { ...filters };
    }
    const paginationProps: ListaAlertaProps = {
      page: page,
      size: this.pageSize,
      idInstituicao: this.currentFilters?.idInstituicao
    };
    const filterProps = new ListaAlertaFilter(paginationProps);

    this._store.dispatch(new BuscarListaAlertaAction(filterProps)).subscribe(() => {
      this.dataLength = this.listaAlertas().data.totalItens;
    })
  }

  public setarBreadcrumb(listaAlerta: ListaAlerta) {
    this._store.dispatch(new SetarBreadcrumbAction(listaAlerta.nmListaAlerta))
  }
  rowChange(event: MouseEvent, listaAlerta: ListaAlerta ){
    event.stopPropagation();
    event.preventDefault();
    this._modalService.component(ModalOptionsComponent).open(listaAlerta)
  }

  displayedColumns: string[] = ['nmListaAlerta', 'dsListaAlerta', 'idInstituicao'];
}
