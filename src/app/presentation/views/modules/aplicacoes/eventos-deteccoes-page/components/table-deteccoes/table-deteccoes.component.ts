import { ResponsePaginacao } from '@/application/dtos/response-paginacao.dto';
import { BuscarDeteccoesUseCase } from '@/application/usecase/deteccao/buscar-deteccoes.usecase';
import { DeteccaoFilter, DeteccaoProps } from '@/domain/filters/deteccao/deteccao.filter';
import { DeteccaoQueryResponse } from '@/domain/models/query/deteccao-query-response';
import { TablePageBase } from '@/infrastructure/configuration/table-config/table-page.config';
import { ModeloPlacaComponent } from '@/presentation/shared/components/modelo-placa/modelo-placa.component';
import { NoTableComponent } from '@/presentation/shared/components/no-table/no-table.component';
import { SetColorByNivel } from '@/presentation/shared/helpers/set-color-by-nivel.helper';
import { tableModule } from '@/presentation/shared/table.module';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BadgeComponent } from '@tivic-team/tivic-ui';


@Component({
  selector: 'app-table-deteccoes',
  standalone: true,
  imports: [...tableModule, ModeloPlacaComponent, BadgeComponent, CommonModule, NoTableComponent, DatePipe],
  templateUrl: './table-deteccoes.component.html',
  styleUrl: './table-deteccoes.component.scss'
})

export class TableDeteccoesComponent extends TablePageBase{
  public deteccoes!: ResponsePaginacao<DeteccaoQueryResponse>;
  public dataLength!: number;
  protected override pageSize: number = 5;
  public displayedColumns: string[] = ['imgOriginal', 'nmPlaca', 'idEquipamento', 'dtDeteccao'];

  constructor(private buscarDeteccoesUseCase: BuscarDeteccoesUseCase){
    super()
  }


  ngOnInit(): void {
    // if (!this.formGroup) {
    //   this.formGroup = new FormGroup({});
    // }
    this.load();
  }

  public load(filters?: DeteccaoProps, page: number = 0) {
    if (filters) {
      this.currentFilters = { ...filters };
    }
    const paginationProps: DeteccaoProps = {
      page: page,
      size: this.pageSize,
      cdInstituicao: this.currentFilters?.cdInstituicao,
      cdEquipamento: this.currentFilters?.cdEquipamento,
      vlConfidenceAlprInferior: this.currentFilters?.vlConfidenceAlprInferior,
      vlConfidenceAlprSuperior: this.currentFilters?.vlConfidenceAlprSuperior,
      dtDeteccaoInferior: this.currentFilters?.dtDeteccaoInferior,
      dtDeteccaoSuperior: this.currentFilters?.dtDeteccaoSuperior,
      nmPiv: this.currentFilters?.nmPiv,
      nmPlaca: this.currentFilters?.nmPlaca,
      vlConfidencePivInferior: this.currentFilters?.vlConfidencePivInferior,
      vlConfidencePivSuperior: this.currentFilters?.vlConfidencePivSuperior,
      lgAtivo: this.currentFilters?.lgAtivo,

    };
    const filterProps = new DeteccaoFilter(paginationProps);
    this.buscarDeteccoesUseCase.execute(filterProps).subscribe((response) => {
      this.deteccoes = response.data
      this.dataLength = response.data.totalItens
      console.log(this.deteccoes.dados.length)
    })
  }

  public getColorByNivel(nivel: number): string {
    return SetColorByNivel.setColor(nivel);
  }
}

