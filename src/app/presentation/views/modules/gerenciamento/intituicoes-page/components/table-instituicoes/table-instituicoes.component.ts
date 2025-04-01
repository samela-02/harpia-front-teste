import { ResponseData } from '@/application/dtos/response-data.dto';
import { ResponsePaginacao } from '@/application/dtos/response-paginacao.dto';
import { Instituicao } from '@/domain/models/command/instituicao';
import { Component, inject, Input } from '@angular/core';
import { InstituicaoFilter, InstituicaoProps } from '@/domain/filters/instituicao/instituicao.filter';
import { tableModule } from '@/presentation/shared/table.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { ModalService } from '@tivic-team/tivic-ui';
import { ModalFormInstituicaoUpdateComponent } from '../modal-form-update-instituicao/modal-form-update-instituicao.component';
import { Store } from '@ngxs/store';
import { BuscarInstituicoesAction } from '@/infrastructure/store/actions/instituicao.actions';
import { InstituicaoSelectors } from '@/infrastructure/store/selectors/instituicao.selectors';
import { FormGroup } from '@angular/forms';
import { TablePageBase } from '@/infrastructure/configuration/table-config/table-page.config';

@Component({
  selector: 'app-table-instituicoes',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule],
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

  getSituacao = (lgAtivo: boolean) => lgAtivo ? "Ativo" : "Inativo";

  displayedColumns: string[] = ['idInstituicao', 'nmInstituicao', 'txtObservacao', 'lgAtivo'];
}
