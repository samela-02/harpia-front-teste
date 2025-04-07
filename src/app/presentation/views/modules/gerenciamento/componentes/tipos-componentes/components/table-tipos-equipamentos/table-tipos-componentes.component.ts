import { TiposComponentesFilter, TiposComponentesProps } from '@/domain/filters/tipo-componente/tipo-componente.filter';
import { TipoComponente } from '@/domain/models/command/tipo-componente';
import { TablePageBase } from '@/infrastructure/configuration/table-config/table-page.config';
import { BuscarTiposComponentesAction } from '@/infrastructure/store/actions/tipo-componente.actions';
import { TipoComponenteSelectors } from '@/infrastructure/store/selectors/tipo-componente.selectors';
import { tableModule } from '@/presentation/shared/table.module';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { Store } from '@ngxs/store';
import { ModalService } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-table-tipos-componentes',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule, DatePipe],
  templateUrl: './table-tipos-componentes.component.html',
  styleUrl: './table-tipos-componentes.component.scss'
})

export class TableTiposComponentesComponent extends TablePageBase{
  @Input() formGroup: FormGroup = new FormGroup({});
  private _store = inject(Store);
  // private _modalService = inject(ModalService<ModalFormTipoComponenteUpdateComponent>);
  private _tipoComponente = this._store.selectSignal(TipoComponenteSelectors.tiposComponentes);
  override currentFilters?: TiposComponentesProps;

  public tipoComponente = this._tipoComponente;
  dataLength = 0

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = new FormGroup({});
    }
    this.load();
  }

  public load(filters?: TiposComponentesProps, page: number = 0) {
    if (filters) {
      this.currentFilters = { ...filters };
    }
    const paginationProps: TiposComponentesProps = {
      page: page,
      size: this.pageSize,
      nmTipoComponente: this.currentFilters?.nmTipoComponente,
    };
    const filterProps = new TiposComponentesFilter(paginationProps);

    this._store.dispatch(new BuscarTiposComponentesAction(filterProps)).subscribe(() => {
      this.dataLength = this.tipoComponente().data.totalItens;
    })
  }

  rowChange(event: MouseEvent, tipoComponente: TipoComponente ){
    event.stopPropagation();
    event.preventDefault();
    // this._modalService.component(ModalFormTipoComponenteUpdateComponent).open(tipoComponente);
  }

  getSituacao = (lgAtivo: boolean) => lgAtivo ? "Ativo" : "Inativo";

  displayedColumns: string[] = ['nmTipoComponente', 'dtDelecao', 'lgAtivo'];
}
