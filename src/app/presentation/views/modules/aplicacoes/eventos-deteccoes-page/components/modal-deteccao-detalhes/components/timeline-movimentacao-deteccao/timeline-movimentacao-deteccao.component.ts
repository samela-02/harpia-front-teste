import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TimelineComponent } from "../../../../../../../../shared/components/timeline/timeline.component";
import { TimelineDto } from '@/domain/dtos/timeline.dto';
import { Observer } from '@/domain/observer/observer';
import { Mediator } from '@/domain/mediator/mediator';
import { EventoMediator } from '@/domain/enums/evento-mediator';
import { BuscarMovimentacoesDeteccaoUseCase } from '@/application/usecase/deteccao/buscar-movimentacoes-deteccao.usecase';
import { MovimentacaoDeteccaoQueryResponse } from '@/domain/models/query/movimentacao-deteccao-query-response';

@Component({
  selector: 'app-timeline-movimentacao-deteccao',
  standalone: true,
  imports: [TimelineComponent],
  templateUrl: './timeline-movimentacao-deteccao.component.html',
  styleUrl: './timeline-movimentacao-deteccao.component.scss'
})
export class TimelineMovimentacaoDeteccaoComponent implements OnInit, OnDestroy, Observer {
  @Input() cdDeteccao: number;

  timelineList: TimelineDto[];

  constructor(private _mediator: Mediator, private _buscarMovimentacoesUseCase: BuscarMovimentacoesDeteccaoUseCase) {
    this._mediator.registrarEvento(EventoMediator.OBSERVACAO_ADICIONADA, this);
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
          movimentacao.nmEmailUsuario);
      });
  }

  ngOnDestroy(): void {
    this._mediator.removerRegistroDoEvento(EventoMediator.OBSERVACAO_ADICIONADA, this);
  }

  onEvent(data: any): void {
    this.buscarMovimentacoes();
  }

  getObserverId(): string {
    return TimelineMovimentacaoDeteccaoComponent.name;
  }
}
