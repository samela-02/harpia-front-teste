import { InstituicaoFilter, InstituicaoProps } from '@/domain/filters/instituicao/instituicao.filter';
import { Instituicao } from '@/domain/models/command/instituicao';
import { TablePageBase } from '@/infrastructure/configuration/table-config/table-page.config';
import { BuscarInstituicoesAction } from '@/infrastructure/store/actions/instituicao.actions';
import { InstituicaoSelectors } from '@/infrastructure/store/selectors/instituicao.selectors';
import { tableModule } from '@/presentation/shared/table.module';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { Store } from '@ngxs/store';
import { ModalService } from '@tivic-team/tivic-ui';
import { ModalFormInstituicaoUpdateComponent } from '../modal-form-update-instituicao/modal-form-update-instituicao.component';
import { NoTableComponent } from '@/presentation/shared/components/no-table/no-table.component';
import { ChipStatusComponent } from '@/presentation/shared/components/chip-status/chip-status.component';

@Component({
  selector: 'app-table-instituicoes',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule, NoTableComponent, ChipStatusComponent],
  templateUrl: './table-instituicoes.component.html',
  styleUrl: './table-instituicoes.component.scss'
})

export class TableInstituicoesComponent extends TablePageBase{
  @Input() formGroup: FormGroup = new FormGroup({});
  private _store = inject(Store);
  private _modalService = inject(ModalService<ModalFormInstituicaoUpdateComponent>);
  private _instituicoes = this._store.selectSignal(InstituicaoSelectors.instituicao);
  override currentFilters?: InstituicaoProps;

  public instituicoes = this._instituicoes;
  dataLength = 0

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = new FormGroup({});
    }
    this.load();
  }

  public load(filters?: InstituicaoProps, page: number = 0) {
    if (filters) {
      this.currentFilters = { ...filters };
    }
    const paginationProps: InstituicaoProps = {
      page: page,
      size: this.pageSize,
      nmInstituicao: this.currentFilters?.nmInstituicao,
      idInstituicao: this.currentFilters?.idInstituicao
    };
    const filterProps = new InstituicaoFilter(paginationProps);

    this._store.dispatch(new BuscarInstituicoesAction(filterProps)).subscribe(() => {
      this.dataLength = this.instituicoes().data.totalItens;
    })
  }

  rowChange(event: MouseEvent, instituicao: Instituicao ){
    event.stopPropagation();
    event.preventDefault();
    this._modalService.component(ModalFormInstituicaoUpdateComponent).open(instituicao);
  }

  displayedColumns: string[] = ['idInstituicao', 'nmInstituicao', 'txtObservacao', 'nmCidade', 'lgAtivo'];
}
