import { DeteccaoQueryResponse } from '@/domain/models/query/deteccao-query-response';
import { TruncatePipe } from '@/infrastructure/pipe/truncate.pipe';
import { CardDetailsComponent } from '@/presentation/shared/components/card-details/card-details.component';
import { InfoLineComponent } from '@/presentation/shared/components/info-line/info-line.component';
import { SetColorByNivel } from '@/presentation/shared/helpers/set-color-by-nivel.helper';
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mais-detalhes-content-modal',
  standalone: true,
  imports: [InfoLineComponent, CardDetailsComponent, DatePipe, TruncatePipe],
  templateUrl: './mais-detalhes-content-modal.component.html',
  styleUrl: './mais-detalhes-content-modal.component.scss'
})
export class MaisDetalhesContentModalComponent {
  @Input() deteccao: DeteccaoQueryResponse

  public getColorByNivel(nivel: number): string {
    return SetColorByNivel.setColor(nivel);
  }
}
