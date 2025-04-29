import { VeiculoCCOFilter, VeiculoCCOProps } from '@/domain/filters/veiculoCCO/veiculoCCO.filter';
import { Instituicao } from '@/domain/models/command/instituicao';
import { TablePageBase } from '@/infrastructure/configuration/table-config/table-page.config';
import { BUscarVeiculosCCOAction } from '@/infrastructure/store/actions/veiculo-cco.actions';
import { VeiculoCCOSelectors } from '@/infrastructure/store/selectors/veiculo-cco.selectors';
import { ModeloPlacaComponent } from '@/presentation/shared/components/modelo-placa/modelo-placa.component';
import { NoTableComponent } from '@/presentation/shared/components/no-table/no-table.component';
import { tableModule } from '@/presentation/shared/table.module';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { Store } from '@ngxs/store';
import { ModalService } from '@tivic-team/tivic-ui';
import { ModalFormVeiculoCCOUpdateComponent } from '../modal-form-update-veiculo-cco/modal-form-update-veiculo-cco.component';
import { VeiculoCCOQueryResponse } from '@/domain/models/query/veiculo-cco-query-response';

@Component({
  selector: 'app-table-veiculos-cco',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule, NoTableComponent, ModeloPlacaComponent],
  templateUrl: './table-veiculos-cco.component.html',
  styleUrl: './table-veiculos-cco.component.scss'
})

export class TableVeiculosCCOComponent extends TablePageBase{
  @Input() formGroup: FormGroup = new FormGroup({});
  private _store = inject(Store);
  private _modalService = inject(ModalService<ModalFormVeiculoCCOUpdateComponent>);
  private _veiculosCCO = this._store.selectSignal(VeiculoCCOSelectors.veiculosCCO);
  override currentFilters?: VeiculoCCOProps;

  public veiculosCCO = this._veiculosCCO;
  dataLength = 0

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = new FormGroup({});
    }
    this.load();
  }

  public load(filters?: VeiculoCCOProps, page: number = 0) {
    if (filters) {
      this.currentFilters = { ...filters };
    }
    const paginationProps: VeiculoCCOProps = {
      page: page,
      size: this.pageSize,
      nrPlaca: this.currentFilters?.nrPlaca,
      nmMarca: this.currentFilters?.nmMarca,
      nmModelo: this.currentFilters?.nmModelo
    };
    const filterProps = new VeiculoCCOFilter(paginationProps);

    this._store.dispatch(new BUscarVeiculosCCOAction(filterProps)).subscribe(() => {
      this.dataLength = this.veiculosCCO().data.totalItens;
    })
  }

  rowChange(event: MouseEvent, veiculo: VeiculoCCOQueryResponse ){
    event.stopPropagation();
    event.preventDefault();
    this._modalService.component(ModalFormVeiculoCCOUpdateComponent).open(veiculo);
  }

  getSituacao = (lgAtivo: boolean) => lgAtivo ? "Ativo" : "Inativo";

  displayedColumns: string[] = ['idVeiculo', 'nrPlaca', 'nmMarca', 'nmModelo', 'corVeiculo', 'lgAtivo', 'dtDelecao'];
}
