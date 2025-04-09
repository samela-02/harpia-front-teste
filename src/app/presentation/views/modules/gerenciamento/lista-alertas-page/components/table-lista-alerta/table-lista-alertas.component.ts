import { ListaAlertaFilter, ListaAlertaProps } from '@/domain/filters/lista-alerta/lista-alerta.filter';
import { ListaAlerta } from '@/domain/models/command/lista-alerta';
import { TablePageBase } from '@/infrastructure/configuration/table-config/table-page.config';
import { SetarBreadcrumbAction } from '@/infrastructure/store/actions/breadcrumb.action';
import { BuscarListaAlertaAction } from '@/infrastructure/store/actions/lista-alerta.actions';
import { ListaAlertaSelectors } from '@/infrastructure/store/selectors/lista-alerta.selectors';
import { tableModule } from '@/presentation/shared/table.module';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { Route, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ModalService } from '@tivic-team/tivic-ui';
import { ModalFormListaAlertaUpdateComponent } from '../modal-form-update-lista-alerta/modal-form-update-lista-alerta.component';

@Component({
  selector: 'app-table-lista-alertas',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule],
  templateUrl: './table-lista-alertas.component.html',
  styleUrl: './table-lista-alertas.component.scss'
})

export class TableListaAlertasComponent extends TablePageBase{
  @Input() formGroup: FormGroup = new FormGroup({});
  private route: Route
  private _store = inject(Store);
  private _modalService = inject(ModalService<ModalFormListaAlertaUpdateComponent>);
  private _router = inject(Router);
  listaAlertas = this._store.selectSignal(ListaAlertaSelectors.listaAlerta);
  override currentFilters?: ListaAlertaProps;

  dataLength = 0

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = new FormGroup({});
    }
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
    this.setarBreadcrumb(listaAlerta);
    this._router.navigate(['/gerenciamento/lista-alertas', listaAlerta.cdListaAlerta]);
  }

  displayedColumns: string[] = ['nmListaAlerta', 'dsListaAlerta', 'idInstituicao'];
}
