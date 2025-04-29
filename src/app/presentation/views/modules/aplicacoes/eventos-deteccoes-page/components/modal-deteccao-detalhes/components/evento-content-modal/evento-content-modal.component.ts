import { DeteccaoQueryResponse } from '@/domain/models/query/deteccao-query-response';
import { CardDetailsComponent } from '@/presentation/shared/components/card-details/card-details.component';
import { InfoLineComponent } from '@/presentation/shared/components/info-line/info-line.component';
import { MapMarkersComponent } from '@/presentation/shared/components/map-markers/map-markers.component';
import { SetColorByNivel } from '@/presentation/shared/helpers/set-color-by-nivel.helper';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ImagemDeteccaoModalComponent } from './components/imagem-deteccao-modal/imagem-deteccao-modal.component';
import { ModalService } from '@/infrastructure/services/modal/modal.service';

@Component({
  selector: 'app-evento-content-modal',
  standalone: true,
  imports: [MapMarkersComponent, CardDetailsComponent, InfoLineComponent, CommonModule],
  templateUrl: './evento-content-modal.component.html',
  styleUrl: './evento-content-modal.component.scss'
})
export class EventoContentModalComponent {
  private _modalService = inject(ModalService<ImagemDeteccaoModalComponent>)

  @Input() deteccao: DeteccaoQueryResponse;

  public getColorByNivel(nivel: number): string {
    return SetColorByNivel.setColor(nivel);
  }

  openModal(event: MouseEvent, deteccao: DeteccaoQueryResponse) {
    event.stopPropagation();
    event.preventDefault();
    this._modalService.component(ImagemDeteccaoModalComponent).open(deteccao);
  }
}
