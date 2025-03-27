import { ResponseData } from '@/application/dtos/response-data.dto';
import { ResponsePaginacao } from '@/application/dtos/response-paginacao.dto';
import { BuscarInstituicoesUseCase } from '@/application/usecase/instituicao/buscar-instituicoes.usecase';
import { BuscarDadosDeUsuarioUseCase } from '@/application/usecase/usuario/buscar-dados-de-usuario.usecase';
import { Instituicao } from '@/domain/models/instituicao';
import { Component } from '@angular/core';
import { InstituicaoFilter, InstituicaoProps } from '@/domain/filters/instituicao.filter';
import { tableModule } from '@/presentation/shared/table.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table-instituicoes',
  standalone: true,
  imports: [...tableModule, MatChipsModule, MatSortModule, CommonModule],
  templateUrl: './table-instituicoes.component.html',
  styleUrl: './table-instituicoes.component.scss'
})
export class TableInstituicoesComponent {
  constructor(private buscarInstituicoesUseCase: BuscarInstituicoesUseCase){}

  dataSource!: ResponseData<ResponsePaginacao<Instituicao[]>>;
  dataLength = 0

  pageSize: number = 10;
  pageIndex: number = 0;

  ngOnInit(): void {
    this.load()

  }

  load(page: number = 0) {
    const paginationProps: InstituicaoProps = {
      page: page,
      size: this.pageSize,
    };
    console.log(paginationProps)
    const filter = new InstituicaoFilter(paginationProps);
    this.buscarInstituicoesUseCase.execute(filter).subscribe((response) => {
      this.dataSource = response;
      this.dataLength = this.dataSource.data.totalItens
      this.pageSize = this.pageSize;
    });
  }

  protected onPageChange(page: PageEvent){
    this.pageSize = page.pageSize;
    this.pageIndex = page.pageIndex -1;
    this.load(this.pageIndex + 1);
  }

  getSituacao = (lgAtivo: boolean) => lgAtivo ? "Ativo" : "Inativo";

  displayedColumns: string[] = ['idInstituicao', 'nmInstituicao', 'txtObservacao', 'lgAtivo'];
}
