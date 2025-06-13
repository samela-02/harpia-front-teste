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
import { Component, inject, OnDestroy } from '@angular/core';
import { BadgeComponent } from '@tivic-team/tivic-ui';
import { ModalDeteccaoDetalhesComponent } from '../modal-deteccao-detalhes/modal-deteccao-detalhes.component';
import { ModalService } from '@/infrastructure/services/modal/modal.service';
import { Observer } from '@/domain/observer/observer';
import { Mediator } from '@/domain/mediator/mediator';
import { EventosMediator } from '@/domain/enums/evento-mediator';

@Component({
  selector: 'app-table-deteccoes',
  standalone: true,
  imports: [...tableModule, ModeloPlacaComponent, BadgeComponent, CommonModule, NoTableComponent, DatePipe],
  templateUrl: './table-deteccoes.component.html',
  styleUrl: './table-deteccoes.component.scss'
})

export class TableDeteccoesComponent extends TablePageBase implements Observer, OnDestroy {
  public deteccoes!: ResponsePaginacao<DeteccaoQueryResponse>;
  public dataLength!: number;
  protected override pageSize: number = 5;
  public displayedColumns: string[] = ['imgOriginal', 'nrPlaca', 'idEquipamento', 'dtDeteccao'];

  private _modalService = inject(ModalService<ModalDeteccaoDetalhesComponent>);

  constructor(private buscarDeteccoesUseCase: BuscarDeteccoesUseCase, private _mediator: Mediator){
    super()
    this._mediator.registrarEvento(EventosMediator.BUSCAR_DETECCOES_APOS_REJEITAR_DETECCAO, this);
  }

  ngOnInit(): void {
    this.load();
  }

  public load(filters?: DeteccaoProps) {
    if (filters) {
      this.currentFilters = { ...filters };
    }
    const paginationProps: DeteccaoProps = {
      page: this.pageIndex,
      size: this.pageSize,
      cdInstituicao: this.currentFilters?.cdInstituicao,
      cdEquipamento: this.currentFilters?.cdEquipamento,
      vlConfidenceAlprInferior: this.currentFilters?.vlConfidenceAlprInferior,
      vlConfidenceAlprSuperior: this.currentFilters?.vlConfidenceAlprSuperior,
      dtDeteccaoInferior: this.currentFilters?.dtDeteccaoInferior,
      dtDeteccaoSuperior: this.currentFilters?.dtDeteccaoSuperior,
      nmPiv: this.currentFilters?.nmPiv,
      nrPlaca: this.currentFilters?.nrPlaca,
      vlConfidencePivInferior: this.currentFilters?.vlConfidencePivInferior,
      vlConfidencePivSuperior: this.currentFilters?.vlConfidencePivSuperior,
      lgAtivo: 1
    };
    const filterProps = new DeteccaoFilter(paginationProps);
    this.buscarDeteccoesUseCase.execute(filterProps).subscribe((response) => {
      this.deteccoes = response.data
      this.dataLength = response.data.totalItens
    })
  }

  rowChange(event: MouseEvent, deteccao: DeteccaoQueryResponse) {
    event.stopPropagation();
    event.preventDefault();
    this._modalService.component(ModalDeteccaoDetalhesComponent).open(deteccao);
  }

  public getColorByNivel(nivel: number): string {
    return SetColorByNivel.setColor(nivel);
  }

  onEvent(data: any): void {
    this.load();
  }

  getObserverId(): string {
    return TableDeteccoesComponent.name;
  }

  ngOnDestroy(): void {
    this._mediator.removerRegistroDoEvento(EventosMediator.BUSCAR_DETECCOES_APOS_REJEITAR_DETECCAO, this)
  }
}

