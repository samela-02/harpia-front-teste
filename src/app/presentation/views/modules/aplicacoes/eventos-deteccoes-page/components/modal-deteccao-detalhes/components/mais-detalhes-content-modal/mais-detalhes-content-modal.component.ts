import { DeteccaoQueryResponse } from '@/domain/models/query/deteccao-query-response';
import { AlertaSelectors } from '@/infrastructure/store/selectors/alerta.selectors';
import { CardDetailsComponent } from '@/presentation/shared/components/card-details/card-details.component';
import { InfoLineComponent } from '@/presentation/shared/components/info-line/info-line.component';
import { SetColorByNivel } from '@/presentation/shared/helpers/set-color-by-nivel.helper';
import { DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-mais-detalhes-content-modal',
  standalone: true,
  imports: [InfoLineComponent, CardDetailsComponent, DatePipe],
  templateUrl: './mais-detalhes-content-modal.component.html',
  styleUrl: './mais-detalhes-content-modal.component.scss'
})
export class MaisDetalhesContentModalComponent {
  private _store = inject(Store);
  @Input() deteccao: DeteccaoQueryResponse
  public dadosAlerta = this._store.selectSignal(AlertaSelectors.alertaPorCd);

  public getColorByNivel(nivel: number): string {
    return SetColorByNivel.setColor(nivel);
  }
}
