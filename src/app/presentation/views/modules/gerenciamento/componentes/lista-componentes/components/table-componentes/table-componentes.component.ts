import { ComponentesFilter, ComponentesProps } from '@/domain/filters/componente/componente.filter';
import { Componente } from '@/domain/models/command/componentes';
import { TablePageBase } from '@/infrastructure/configuration/table-config/table-page.config';
import { BuscarComponentesAction } from '@/infrastructure/store/actions/componente.actions';
import { ComponenteSelectors } from '@/infrastructure/store/selectors/componente.selectors';
import { tableModule } from '@/presentation/shared/table.module';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { Store } from '@ngxs/store';
import { ModalService } from '@tivic-team/tivic-ui';
import { ModalFormComponenteUpdateComponent } from '../modal-form-update-componente/modal-form-update-componente.component';

@Component({
  selector: 'app-table-componentes',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule, DatePipe],
  templateUrl: './table-componentes.component.html',
  styleUrl: './table-componentes.component.scss'
})

export class TableComponentesComponent extends TablePageBase{
  @Input() formGroup: FormGroup = new FormGroup({});
  private _store = inject(Store);
  private _modalService = inject(ModalService<ModalFormComponenteUpdateComponent>);
  private _tipoComponente = this._store.selectSignal(ComponenteSelectors.componentes);
  override currentFilters?: ComponentesProps;

  public componente = this._tipoComponente;
  dataLength = 0

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = new FormGroup({});
    }
    this.load();
  }

  public load(filters?: ComponentesProps, page: number = 0) {
    if (filters) {
      this.currentFilters = { ...filters };
    }

    const paginationProps: ComponentesProps = {
      page: page,
      size: this.pageSize,
      nmComponente: this.currentFilters?.nmComponente,
      cdTipoComponente: this.currentFilters?.cdTipoComponente,
      cdEquipamento: this.currentFilters?.cdEquipamento,
      idComponente: this.currentFilters?.idComponente,
    };
    const filterProps = new ComponentesFilter(paginationProps);

    this._store.dispatch(new BuscarComponentesAction(filterProps)).subscribe(() => {
      this.dataLength = this.componente().data.totalItens;
    })
  }

  rowChange(event: MouseEvent, tipoComponente: Componente ){
    event.stopPropagation();
    event.preventDefault();
    this._modalService.component(ModalFormComponenteUpdateComponent).open(tipoComponente);
  }

  getSituacao = (lgAtivo: boolean) => lgAtivo ? "Ativo" : "Inativo";

  displayedColumns: string[] = ['nmComponente', 'idComponente', 'idEquipamento', 'dtDelecao', 'lgAtivo',];
}
