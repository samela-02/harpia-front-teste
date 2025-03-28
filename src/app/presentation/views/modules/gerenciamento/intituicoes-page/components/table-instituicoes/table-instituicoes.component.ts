import { ResponseData } from '@/application/dtos/response-data.dto';
import { ResponsePaginacao } from '@/application/dtos/response-paginacao.dto';
import { Instituicao } from '@/domain/models/instituicao';
import { Component, inject } from '@angular/core';
import { InstituicaoFilter, InstituicaoProps } from '@/domain/filters/instituicao.filter';
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

@Component({
  selector: 'app-table-instituicoes',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule],
  templateUrl: './table-instituicoes.component.html',
  styleUrl: './table-instituicoes.component.scss'
})

export class TableInstituicoesComponent {
  private _store = inject(Store);
  private _modalService = inject(ModalService<ModalFormInstituicaoUpdateComponent>);
  private _instituicoes = this._store.selectSignal(InstituicaoSelectors.instituicao);

  public instituicoes = this._instituicoes;
  dataLength = 0

  pageSize: number = 10;
  pageIndex: number = 0;

  ngOnInit(): void {
    this.load()
  }

  public load(page: number = 0) {
    const paginationProps: InstituicaoProps = {
      page: page,
      size: this.pageSize,
    };
    const filter = new InstituicaoFilter(paginationProps);

    this._store.dispatch(new BuscarInstituicoesAction(filter)).subscribe(() => {
      this.dataLength = this.instituicoes().data.totalItens;
    })
  }

  protected onPageChange(page: PageEvent){
    this.pageSize = page.pageSize;
    this.pageIndex = page.pageIndex -1;
    this.load(this.pageIndex + 1);
  }

  rowChange(event: MouseEvent, instituicao: Instituicao ){
    event.stopPropagation();
    event.preventDefault();
    this._modalService.component(ModalFormInstituicaoUpdateComponent).open(instituicao);
  }

  getSituacao = (lgAtivo: boolean) => lgAtivo ? "Ativo" : "Inativo";

  displayedColumns: string[] = ['idInstituicao', 'nmInstituicao', 'txtObservacao', 'lgAtivo'];
}
