import { TipoEquipamentosFilter, TipoEquipamentosProps } from '@/domain/filters/lista-equipamento/tipo-equipamento.filter';
import { TipoEquipamento } from '@/domain/models/command/tipo-equipamento';
import { TablePageBase } from '@/infrastructure/configuration/table-config/table-page.config';
import { BuscarTiposEquipamentosAction } from '@/infrastructure/store/actions/tipo-equipamento.actions';
import { TipoEquipamentoSelectors } from '@/infrastructure/store/selectors/tipo-equipamento.selectors';
import { tableModule } from '@/presentation/shared/table.module';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { Store } from '@ngxs/store';
import { ModalService } from '@tivic-team/tivic-ui';
import { ModalFormTipoEquipamentoUpdateComponent } from '../modal-form-update-tipo-equipamento/modal-form-update-tipo-equipamento.component';
import { NoTableComponent } from '@/presentation/shared/components/no-table/no-table.component';

@Component({
  selector: 'app-table-tipos-equipamentos',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule, DatePipe, NoTableComponent],
  templateUrl: './table-tipos-equipamentos.component.html',
  styleUrl: './table-tipos-equipamentos.component.scss'
})

export class TableTiposEquipamentosComponent extends TablePageBase{
  @Input() formGroup: FormGroup = new FormGroup({});
  private _store = inject(Store);
  private _modalService = inject(ModalService<ModalFormTipoEquipamentoUpdateComponent>);
  private _tipoEquipamento = this._store.selectSignal(TipoEquipamentoSelectors.tiposEquipamentos);
  override currentFilters?: TipoEquipamentosProps;

  public tipoEquipamento = this._tipoEquipamento;
  dataLength = 0

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = new FormGroup({});
    }
    this.load();
  }

  public load(filters?: TipoEquipamentosProps, page: number = 0) {
    if (filters) {
      this.currentFilters = { ...filters };
    }
    const paginationProps: TipoEquipamentosProps = {
      page: page,
      size: this.pageSize,
      nmTipoEquipamento: this.currentFilters?.nmTipoEquipamento,
    };
    const filterProps = new TipoEquipamentosFilter(paginationProps);

    this._store.dispatch(new BuscarTiposEquipamentosAction(filterProps)).subscribe(() => {
      this.dataLength = this.tipoEquipamento().data.totalItens;
    })
  }

  rowChange(event: MouseEvent, tipoEquipamento: TipoEquipamento ){
    event.stopPropagation();
    event.preventDefault();
    this._modalService.component(ModalFormTipoEquipamentoUpdateComponent).open(tipoEquipamento);
  }

  getSituacao = (lgAtivo: boolean) => lgAtivo ? "Ativo" : "Inativo";

  displayedColumns: string[] = ['nmTipoEquipamento', 'dtDelecao', 'lgAtivo'];
}
