import { BuscarUltimoSnapshotUseCase } from '@/application/usecase/comando/buscar-ultimo-snapshot.usecase';
import { FindStreamUltimaComunicacaoEquipamentoUseCase } from '@/application/usecase/equipamento/find-stream-ultima-comunicacao-equipamento.usecase';
import { buscarDadosGpsUseCase } from '@/application/usecase/gps-tracker/buscar-dados-gps.usecase';
import { EquipamentoComunicacaoQueryResponse } from '@/domain/models/query/equipamento-comunicacao-query-response';
import { GpsTrackerQueryResponse } from '@/domain/models/query/gps-tracker-query-response';
import { AuthServiceImpl } from '@/infrastructure/services/auth.service-impl';
import { ModalService } from '@/infrastructure/services/modal/modal.service';
import { EquipmentStatus } from '@/presentation/interfaces/equipament-status';
import { FiltersInputsComponent } from '@/presentation/shared/components/filters-inputs/filters-inputs.component';
import { MapMarkersComponent } from '@/presentation/shared/components/map-markers/map-markers.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import * as L from 'leaflet';
import { Subscription, interval } from 'rxjs';
import { ModalDetalhesEquipamentoComponent } from './components/modal-detalhes-equipamento/modal-detalhes-equipamento.component';
import { contentMarker } from './helpers/content-marker';

@Component({
  selector: 'app-mapa-veiculos-page',
  standalone: true,
  imports: [FiltersInputsComponent, MapMarkersComponent, CommonModule, DatePipe],
  providers: [DatePipe],
  templateUrl: './mapa-veiculos-page.component.html',
  styleUrl: './mapa-veiculos-page.component.scss',
})
export class MapaVeiculosPageComponent implements OnInit {
  @ViewChild(MapMarkersComponent) mapComponent!: MapMarkersComponent;

  private eventSourceSubscription: Subscription | null = null;
  private ultimaComunicacaoEquipamentoEventSourceSubscription: Subscription | null = null;
  private checkEquipamentoStatusSubscription: Subscription | null = null;
  private movingMarkers: Map<string, L.Marker> = new Map();
  private idInstituicao = this.authService.getIdInstituicaoUser()
  private _modalService = inject(ModalService<ModalDetalhesEquipamentoComponent>)
  private popupContent = L.DomUtil.create("div");

  public equipmentStatusMap: Map<string, EquipmentStatus> = new Map();
  public markerCount: number = 0;

  private gpsAbortController: AbortController = null;
  private ultimaComunicacaoEquipamentoAbortController: AbortController = null;

  constructor(
    private buscarDadosGpsUseCase: buscarDadosGpsUseCase,
    private changeDetectorRef: ChangeDetectorRef,
    private datePipe: DatePipe,
    private authService: AuthServiceImpl,
    private findStreamUltimaComunicacaoEquipamentoUseCase: FindStreamUltimaComunicacaoEquipamentoUseCase,
    private buscarUltimoSnapshotUseCase: BuscarUltimoSnapshotUseCase
  ) { }

  ngOnInit(): void {
    this.gpsAbortController = new AbortController();
    this.ultimaComunicacaoEquipamentoAbortController = new AbortController();
    this.bucarDadosGps();
    this.findStreamUltimaComunicacao();
    this.atualizarStatusEquipamentoAsync();
  }

  public abrirModalDetalhesEquipamento(idEquipamento: string) {
    this._modalService.component(ModalDetalhesEquipamentoComponent).open(idEquipamento)
  }

  private buscarUltimoSnapshot(idEquipamento: string) {
    this.buscarUltimoSnapshotUseCase.execute(idEquipamento).subscribe((response) => {
      const formattedDtPedido = response.data?.dtPedido
        ? this.datePipe.transform(response.data.dtPedido, 'dd/MM/yyyy HH:mm:ss')
        : undefined;
      this.updatePopupContent(response.data?.cntComando, idEquipamento, formattedDtPedido);
    });
  }

  bucarDadosGps() {
    this.eventSourceSubscription = this.buscarDadosGpsUseCase.execute(this.gpsAbortController, this.idInstituicao).subscribe((response) => {
      try {
        const equipamentoData: GpsTrackerQueryResponse = JSON.parse(response.data);

        if (equipamentoData.gps[0]?.vlLatitude && equipamentoData.gps[0]?.vlLongitude && equipamentoData.idEquipamento) {
          const novaCoordenada: [number, number] = [equipamentoData.gps[0].vlLatitude, equipamentoData.gps[0].vlLongitude];
          this.updateMovingMarker(novaCoordenada, equipamentoData.gps[0].vlTrueCourse ?? 0, equipamentoData.idEquipamento);
        }

        this.changeDetectorRef.detectChanges();
      } catch (error) {
        console.error("Erro ao processar dado do EventSource:", error, response.data);
      }
    });
  }

  private findStreamUltimaComunicacao() {
    this.ultimaComunicacaoEquipamentoEventSourceSubscription = this.findStreamUltimaComunicacaoEquipamentoUseCase
      .execute(this.ultimaComunicacaoEquipamentoAbortController)
      .subscribe((response) => {
        const equipamentoComunicacaoList: EquipamentoComunicacaoQueryResponse[] = JSON.parse(response.data);
        const equipamentoStatusList: EquipmentStatus[] = this.converterQueryEmEquipamentoStatus(equipamentoComunicacaoList);
        this.equipmentStatusMap = this.converterListEmMap(equipamentoStatusList);
      });
  }

  private converterQueryEmEquipamentoStatus(equipamentoComunicacaoList: EquipamentoComunicacaoQueryResponse[]): EquipmentStatus[] {
    return equipamentoComunicacaoList
      .map(equipamento => {
        return {
          idEquipamento: equipamento.idEquipamento,
          dtUltimaComunicacao: equipamento.dtUltimaComunicacao,
          statusColor: this.calculateStatusColor(equipamento.dtUltimaComunicacao)
        }
      });
  }

  private converterListEmMap(equipamentoStatusList: EquipmentStatus[]): Map<string, EquipmentStatus> {
    let result: Map<string, EquipmentStatus> = new Map();
    equipamentoStatusList
      .forEach(equipamento => {
        result.set(equipamento.idEquipamento, equipamento);
      })
    return result;
  }

  private atualizarStatusEquipamentoAsync(): void {
    this.checkEquipamentoStatusSubscription = interval(60000)
      .subscribe(() => this.atualizarStatusEquipamento());
  }

  private atualizarStatusEquipamento(): void {
    let changed = false;
    this.equipmentStatusMap.forEach((status, id) => {
      const newColor = this.calculateStatusColor(status.dtUltimaComunicacao);
      if (status.statusColor !== newColor) {
        status.statusColor = newColor;
        this.equipmentStatusMap.set(id, status);
        changed = true;
      }
    });
    if (changed) {
      this.changeDetectorRef.detectChanges();
    }
  }

  private calculateStatusColor(lastCommunicationTime: Date): 'green' | 'yellow' | 'red' | 'gray' {
    const now = new Date();
    lastCommunicationTime = new Date(lastCommunicationTime)
    const diffMinutes = (now.getTime() - lastCommunicationTime.getTime()) / (1000 * 60);

    if (diffMinutes < 10) {
      return 'green';
    }
    if (diffMinutes < 60) {
      return 'yellow';
    }
    if(diffMinutes < 1440) {
      return 'red';
    }
    return 'gray'
  }

  getEquipmentStatusList(): EquipmentStatus[] {
    return Array.from(this.equipmentStatusMap.values())
      .sort((a, b) => {
        return this.ajustarData(b.dtUltimaComunicacao) - this.ajustarData(a.dtUltimaComunicacao);
      });
  }

  private ajustarData(date: Date): number {
    if (date == null)
      return 0;
    return new Date(date).getTime();
  }

  private updateMovingMarker(coordinate: [number, number], direction: number, idEquipamento: string): void {
    const map = this.mapComponent?.getMap();
    if (!map) return;
    const existingMarker = this.movingMarkers.get(idEquipamento);
    if (existingMarker) {
      this.animateMarker(existingMarker, coordinate, direction);
    } else {
      this.createAndAddMarker(map, coordinate, direction, idEquipamento);
    }
  }

  private animateMarker(existingMarker: L.Marker, coordinate: [number, number], direction: number): void {
    const currentPosition = existingMarker.getLatLng();
    const newPosition = L.latLng(coordinate[0], coordinate[1]);

    this.updateMarkerIcon(existingMarker, direction);
    const frames = 50;
    let frame = 0;

    const animate = () => {
      frame++;
      const progress = this.easeInOutQuad(frame / frames);
      const lat = currentPosition.lat + (newPosition.lat - currentPosition.lat) * progress;
      const lng = currentPosition.lng + (newPosition.lng - currentPosition.lng) * progress;

      existingMarker.setLatLng([lat, lng]);

      if (frame < frames) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  }

  private createAndAddMarker(map: L.Map, coordinate: [number, number], direction: number, idEquipamento: string): void {
    const newMarker = L.marker(coordinate, {
      icon: this.createCarIcon()
    }).addTo(map);
    this.addPopupToMarker(newMarker, idEquipamento);
    this.updateMarkerIcon(newMarker, direction);
    this.movingMarkers.set(idEquipamento, newMarker);
    this.markerCount = this.movingMarkers.size;
  }

  private updateMarkerIcon(marker: L.Marker, direction: number): void {
    const markerElement = marker.getElement();
    if (markerElement) {
      const iconElement = markerElement.querySelector('.car-icon');
      if (iconElement) {
        (iconElement as HTMLElement).style.transform = `rotate(${direction}deg)`;
      }
    }
  }

  private updatePopupContent = (
    imgSrc: string,
    idEquipamento: string,
    formattedDtPedido?: string
  ) => {
    this.popupContent.innerHTML = contentMarker(
      `ID: ${idEquipamento}<br>Última Att: ${formattedDtPedido}`,
      imgSrc,
      idEquipamento,
      formattedDtPedido
    );
    const button = this.popupContent.querySelector('.button-action') as HTMLButtonElement;
    if (button) {
      button.onclick = () => this.abrirModalDetalhesEquipamento(idEquipamento);
    }
  };

  private addPopupToMarker(marker: L.Marker, idEquipamento: string): void {
    const status = this.equipmentStatusMap.get(idEquipamento);
    const lastUpdateFormatted = status
      ? this.datePipe.transform(status.dtUltimaComunicacao, 'dd/MM/yyyy HH:mm:ss')
      : 'N/A';

    this.updatePopupContent("assets/no-content.png", idEquipamento, lastUpdateFormatted);

    marker.bindPopup(this.popupContent);
    marker.off('popupopen');
    marker.on('popupopen', () => {
      this.buscarUltimoSnapshot(idEquipamento);
    });
  }

  private easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  private createCarIcon(): L.DivIcon {
    return L.divIcon({
      html: `<div class="car-icon-wrapper">
               <img src="assets/pinCar.gif" class="car-icon" style="width: 17px; height: 30px;"/>
             </div>`,
      className: '',
      iconSize: [30, 17],
      iconAnchor: [10, 15],
      popupAnchor: [0,-15]
    });
  }

  ngOnDestroy() {
    if (this.eventSourceSubscription) {
      this.gpsAbortController.abort();
      this.eventSourceSubscription.unsubscribe();
    }
    if (this.checkEquipamentoStatusSubscription) {
      this.eventSourceSubscription.unsubscribe();
    }
    if (this.ultimaComunicacaoEquipamentoEventSourceSubscription) {
      this.ultimaComunicacaoEquipamentoAbortController.abort();
      this.ultimaComunicacaoEquipamentoEventSourceSubscription.unsubscribe();
    }
  }
}
