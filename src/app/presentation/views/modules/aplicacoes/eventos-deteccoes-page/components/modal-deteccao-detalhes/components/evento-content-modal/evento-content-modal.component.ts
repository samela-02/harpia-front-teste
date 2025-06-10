import { DeteccaoQueryResponse } from '@/domain/models/query/deteccao-query-response';
import { CardDetailsComponent } from '@/presentation/shared/components/card-details/card-details.component';
import { InfoLineComponent } from '@/presentation/shared/components/info-line/info-line.component';
import { MapMarkersComponent } from '@/presentation/shared/components/map-markers/map-markers.component';
import { SetColorByNivel } from '@/presentation/shared/helpers/set-color-by-nivel.helper';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ImagemDeteccaoModalComponent } from './components/imagem-deteccao-modal/imagem-deteccao-modal.component';
import { ModalService } from '@/infrastructure/services/modal/modal.service';
import { Store } from '@ngxs/store';
import { AlertaSelectors } from '@/infrastructure/store/selectors/alerta.selectors';
import L from 'leaflet';

@Component({
  selector: 'app-evento-content-modal',
  standalone: true,
  imports: [MapMarkersComponent, CardDetailsComponent, InfoLineComponent, CommonModule],
  templateUrl: './evento-content-modal.component.html',
  styleUrl: './evento-content-modal.component.scss'
})
export class EventoContentModalComponent implements AfterViewInit {
  @ViewChild('mapDeteccao') mapComponent!: MapMarkersComponent;

  private _store = inject(Store);
  private _modalService = inject(ModalService<ImagemDeteccaoModalComponent>)
  public dadosAlerta = this._store.selectSignal(AlertaSelectors.alertaPorCd);

  @Input() deteccao: DeteccaoQueryResponse;

  ngAfterViewInit(): void {
    this.plotarPinNoMapa();
  }

  public getColorByNivel(nivel: number): string {
    return SetColorByNivel.setColor(nivel);
  }

  openModal(event: MouseEvent, deteccao: DeteccaoQueryResponse) {
    event.stopPropagation();
    event.preventDefault();
    this._modalService.component(ImagemDeteccaoModalComponent).open(deteccao);
  }

  private plotarPinNoMapa() {
    const map = this.mapComponent?.getMap();
    if (map) {
      const coordenadas: [number, number] = this.getCoordenadas();
      L.marker(coordenadas, {
        icon: this.createIcon()
      }).addTo(map);
      map.setView(coordenadas, map.getZoom() || 15);
    }
  }

  private getCoordenadas(): [number, number] {
    return [this.deteccao.vlLatitude, this.deteccao.vlLongitude];
  }

  private createIcon(): L.Icon<L.IconOptions> | L.DivIcon {
    return L.divIcon({
      html: `<div class="car-icon-wrapper">
               <img src="assets/pin-deteccao.png" class="w-[35px] h-[35px]"/>
             </div>`,
      className: '',
      iconAnchor: [0, 0]
    });
  }
}
