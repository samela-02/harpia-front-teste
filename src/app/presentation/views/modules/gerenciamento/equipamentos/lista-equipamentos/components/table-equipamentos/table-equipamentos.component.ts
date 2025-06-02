import { TablePageBase } from '@/infrastructure/configuration/table-config/table-page.config';
import { tableModule } from '@/presentation/shared/table.module';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { Store } from '@ngxs/store';
import { ModalService } from '@tivic-team/tivic-ui';
import { ModalFormEquipamentoUpdateComponent } from '../modal-form-update-equipamento/modal-form-update-equipamento.component';
import { EquipamentoSelectors } from '@/infrastructure/store/selectors/equipamento.selectors';
import { EquipamentosFilter, EquipamentosProps } from '@/domain/filters/equipamento/equipamento.filter';
import { BuscarEquipamentosAction } from '@/infrastructure/store/actions/equipamento.actions';
import { Equipamento } from '@/domain/models/command/equipamento';
import { NoTableComponent } from '@/presentation/shared/components/no-table/no-table.component';
import { ChipStatusComponent } from '@/presentation/shared/components/chip-status/chip-status.component';

@Component({
  selector: 'app-table-equipamentos',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule, DatePipe, NoTableComponent, ChipStatusComponent],
  templateUrl: './table-equipamentos.component.html',
  styleUrl: './table-equipamentos.component.scss'
})

export class TableEquipamentosComponent extends TablePageBase{
  @Input() formGroup: FormGroup = new FormGroup({});
  private _store = inject(Store);
  private _modalService = inject(ModalService<ModalFormEquipamentoUpdateComponent>);
  private _tipoEquipamento = this._store.selectSignal(EquipamentoSelectors.equipamentos);
  override currentFilters?: EquipamentosProps;

  public equipamento = this._tipoEquipamento;
  dataLength = 0

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = new FormGroup({});
    }
    this.load();
  }

  public load(filters?: EquipamentosProps, page: number = 0) {
    if (filters) {
      this.currentFilters = { ...filters };
    }

    const paginationProps: EquipamentosProps = {
      page: page,
      size: this.pageSize,
      lgAtivo: 1,
      nmEquipamento: this.currentFilters?.nmEquipamento,
      cdInstituicao: this.currentFilters?.cdInstituicao,
      idEquipamento: this.currentFilters?.idEquipamento,
      nrSerie: this.currentFilters?.nrSerie,

    };
    const filterProps = new EquipamentosFilter(paginationProps);

    this._store.dispatch(new BuscarEquipamentosAction(filterProps)).subscribe(() => {
      this.dataLength = this.equipamento()?.data?.totalItens;
    })
  }

  rowChange(event: MouseEvent, tipoEquipamento: Equipamento ){
    event.stopPropagation();
    event.preventDefault();
    this._modalService.component(ModalFormEquipamentoUpdateComponent).open(tipoEquipamento);
  }

  displayedColumns: string[] = ['nmEquipamento', 'idEquipamento', 'nrSerie', 'componentes', 'dtAlocacao', 'dtDelecao', 'lgAtivo',];
}
