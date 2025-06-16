import { Component, Input, OnInit } from '@angular/core';
import { TimelineComponent } from "../../../../../../../../shared/components/timeline/timeline.component";
import { DeteccaoQueryResponse } from '@/domain/models/query/deteccao-query-response';
import { TimelineDto } from '@/domain/dtos/timeline.dto';

@Component({
  selector: 'app-timeline-movimentacao-deteccao',
  standalone: true,
  imports: [TimelineComponent],
  templateUrl: './timeline-movimentacao-deteccao.component.html',
  styleUrl: './timeline-movimentacao-deteccao.component.scss'
})
export class TimelineMovimentacaoDeteccaoComponent implements OnInit {
  @Input() deteccao: DeteccaoQueryResponse;

  timelineList: TimelineDto[];

  ngOnInit(): void {
    this.timelineList = this.deteccao
      .movimentacoes
      .map(movimentacao => {
        return new TimelineDto(movimentacao.tpMovimentacaoDeteccao, new Date(movimentacao.dtMovimentacaoDeteccao), movimentacao.dsMovimentacaoDeteccao, movimentacao.nmEmailUsuario);
      })
  }
}
