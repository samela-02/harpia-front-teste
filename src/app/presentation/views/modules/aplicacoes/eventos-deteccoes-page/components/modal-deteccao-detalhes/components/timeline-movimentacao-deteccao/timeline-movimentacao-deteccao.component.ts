import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TimelineComponent } from "../../../../../../../../shared/components/timeline/timeline.component";
import { TimelineDto } from '@/domain/dtos/timeline.dto';
import { MediatorObserver } from '@/domain/observer/mediator-observer';
import { Mediator } from '@/domain/mediator/mediator';
import { MediatorEvento } from '@/domain/enums/mediator-evento';
import { BuscarMovimentacoesDeteccaoUseCase } from '@/application/usecase/deteccao/buscar-movimentacoes-deteccao.usecase';
import { MovimentacaoDeteccaoQueryResponse } from '@/domain/models/query/movimentacao-deteccao-query-response';
import { Icon } from '@/domain/static-instances/icon.static-instances';

@Component({
  selector: 'app-timeline-movimentacao-deteccao',
  standalone: true,
  imports: [TimelineComponent],
  templateUrl: './timeline-movimentacao-deteccao.component.html',
  styleUrl: './timeline-movimentacao-deteccao.component.scss'
})
export class TimelineMovimentacaoDeteccaoComponent implements OnInit, OnDestroy, MediatorObserver {
  @Input() cdDeteccao: number;

  timelineList: TimelineDto[];

  constructor(private _mediator: Mediator, private _buscarMovimentacoesUseCase: BuscarMovimentacoesDeteccaoUseCase) {
    this._mediator.registrarEvento(MediatorEvento.OBSERVACAO_ADICIONADA, this);
  }

  ngOnInit(): void {
    this.buscarMovimentacoes();
  }

  private buscarMovimentacoes() {
    this._buscarMovimentacoesUseCase
      .execute(this.cdDeteccao)
      .subscribe({
        next: (response) => this.timelineList = this.converterMovimentacoes(response)
      });
  }

  private converterMovimentacoes(movimentacoes: MovimentacaoDeteccaoQueryResponse[]): TimelineDto[] {
    return movimentacoes
      .map(movimentacao => {
        return new TimelineDto(movimentacao.tpMovimentacaoDeteccao,
          new Date(movimentacao.dtMovimentacaoDeteccao),
          movimentacao.dsMovimentacaoDeteccao,
          movimentacao.nmEmailUsuario,
          Icon.findByKey(movimentacao.tpMovimentacaoDeteccao));
      });
  }

  ngOnDestroy(): void {
    this._mediator.removerRegistroDoEvento(MediatorEvento.OBSERVACAO_ADICIONADA, this);
  }

  onEvent(eventoMediator: MediatorEvento, data: any): void {
    this.buscarMovimentacoes();
  }

  getObserverId(): string {
    return TimelineMovimentacaoDeteccaoComponent.name;
  }
}
