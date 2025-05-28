import { buscarDadosGpsUseCase } from '@/application/usecase/gps-tracker/buscar-dados-gps.usecase';
import { FiltersInputsComponent } from '@/presentation/shared/components/filters-inputs/filters-inputs.component';
import { MapMarkersComponent } from '@/presentation/shared/components/map-markers/map-markers.component';
import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef, inject } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import * as L from 'leaflet';
import { contentMarker } from './helpers/content-marker';
import { CommonModule, DatePipe } from '@angular/common';
import { GpsTrackerQueryResponse } from '@/domain/models/query/gps-tracker-query-response';
import { EnviarComandoUseCase } from '@/application/usecase/comando/enviar-comando.usecase';
import { BuscarComandoUseCase } from '@/application/usecase/comando/buscar-comando.usecase';
import { ComandoDTo } from '@/domain/dtos/comando.dto';
import { v4 as uuidv4 } from 'uuid';
import { TipoComandoEnum } from '@/domain/enums/tipo-alerta/tipo-comando.enum';
import { EquipmentStatus } from '@/presentation/interfaces/equipament-status';
import { AuthServiceImpl } from '@/infrastructure/services/auth.service-impl';
import { ModalService } from '@tivic-team/tivic-ui';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { FindStreamUltimaComunicacaoEquipamentoUseCase } from '@/application/usecase/equipamento/find-stream-ultima-comunicacao-equipamento.usecase';
import { EquipamentoComunicacaoQueryResponse } from '@/domain/models/query/equipamento-comunicacao-query-response';
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
  private statusCheckIntervalSubscription: Subscription | null = null;
  private movingMarkers: Map<string, L.Marker> = new Map();
  private idInstituicao = this.authService.getIdInstituicaoUser()
  private _modalService = inject(ModalService<ModalContentComponent>)

  public equipmentStatusMap: Map<string, EquipmentStatus> = new Map();
  public markerCount: number = 0;


  constructor(
    private buscarDadosGpsUseCase: buscarDadosGpsUseCase,
    private changeDetectorRef: ChangeDetectorRef,
    private datePipe: DatePipe,
    private enviarComandoUseCase: EnviarComandoUseCase,
    private buscarComandoUseCase: BuscarComandoUseCase,
    private authService: AuthServiceImpl,
    private findStreamUltimaComunicacaoEquipamentoUseCase: FindStreamUltimaComunicacaoEquipamentoUseCase
  ) { }

  ngOnInit(): void {
    this.bucarDadosGps();
    this._findStreamUltimaComunicacao();
  }

  enviarComando(idEquipamento?: string) {
    const uuid = uuidv4()
    const comando = new ComandoDTo(uuid, idEquipamento, TipoComandoEnum.Snapshot)
    this.enviarComandoUseCase.execute(comando).subscribe({
      next: () => {
        this.buscarComando(uuid)
      }
    })
  }

  buscarComando(idComando: string) {
    this.buscarComandoUseCase.execute(idComando).subscribe((response) => {
      const content = JSON.parse(response.data)
      this._modalService.component(ModalContentComponent).open(content)
    })
  }

  bucarDadosGps(){
    this.eventSourceSubscription = this.buscarDadosGpsUseCase.execute(this.idInstituicao).subscribe((response) => {
      try {
        const equipamentoData: GpsTrackerQueryResponse = JSON.parse(response.data);
        this.updateEquipmentStatus(equipamentoData.idEquipamento, equipamentoData.gps[0].dtCriacao, equipamentoData.gps[0].dtEvento)

        if (equipamentoData.gps[0]?.vlLatitude && equipamentoData.gps[0]?.vlLongitude && equipamentoData.idEquipamento) {
          const novaCoordenada: [number, number] = [equipamentoData.gps[0].vlLatitude, equipamentoData.gps[0].vlLongitude];
          this.updateMovingMarker(novaCoordenada, equipamentoData.gps[0].vlTrueCourse ?? 0, equipamentoData.idEquipamento);
        }

        this.changeDetectorRef.detectChanges();

        if (!this.statusCheckIntervalSubscription) {
          this.statusCheckIntervalSubscription = interval(60000).subscribe(() => {
            this.atualizarStatusEquipamentoAsync();
          });
        }
      } catch (error) {
        console.error("Erro ao processar dado do EventSource:", error, response.data);
      }
    });
  }

  private _findStreamUltimaComunicacao() {
    this.ultimaComunicacaoEquipamentoEventSourceSubscription = this.findStreamUltimaComunicacaoEquipamentoUseCase
        .execute()
        .subscribe((response) => {
          const equipamentoComunicacaoList: EquipamentoComunicacaoQueryResponse[] = JSON.parse(response.data);
        });
  }

  private updateEquipmentStatus(idEquipamento: string, communicationTimeBd: Date, communicationTimeGps: Date): void {
    let status = this.equipmentStatusMap.get(idEquipamento);
    if (!status) {
      status = {
        idEquipamento: idEquipamento,
        lastCommunicationTimeBd: communicationTimeBd,
        lastCommunicationTimeGps: communicationTimeGps,
        statusColor: 'green',
        nome: `${idEquipamento}`
      };
    } else {
      status.lastCommunicationTimeBd = communicationTimeBd;
    }
    status.statusColor = this.calculateStatusColor(new Date(communicationTimeBd));
    this.equipmentStatusMap.set(idEquipamento, status);
  }

  private calculateStatusColor(lastCommunicationTime: Date): 'green' | 'yellow' | 'red' {
    const now = new Date();
    lastCommunicationTime = new Date(lastCommunicationTime)
    const diffMinutes = (now.getTime() - lastCommunicationTime.getTime()) / (1000 * 60);

    if (diffMinutes < 10) {
      return 'green';
    } else if (diffMinutes < 60) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  private atualizarStatusEquipamentoAsync(): void {
    let changed = false;
    this.equipmentStatusMap.forEach((status, id) => {
      const newColor = this.calculateStatusColor(status.lastCommunicationTimeBd);
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

  getEquipmentStatusList(): EquipmentStatus[] {
    return Array.from(this.equipmentStatusMap.values());
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

  private addPopupToMarker(marker: L.Marker, idEquipamento: string): void {
    const status = this.equipmentStatusMap.get(idEquipamento);
    const popupContent = L.DomUtil.create("div");
    const lastUpdateFormatted = status ? this.datePipe.transform(status.lastCommunicationTimeBd, 'dd/MM/yyyy HH:mm:ss') : 'N/A';

    popupContent.innerHTML = contentMarker(`ID: ${idEquipamento}<br>Última Att: ${lastUpdateFormatted}`, "assets/gifteste.gif", idEquipamento);

    marker.bindPopup(popupContent);

    marker.off('popupopen');

    marker.on('popupopen', () => {
        const button = popupContent.querySelector('.button-action') as HTMLButtonElement;
        if (button) {
            button.onclick = () => {
                this.enviarComando(idEquipamento);
            }
        }
    });
  }

  private easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  private createCarIcon(): L.DivIcon {
    return L.divIcon({
      html: `<div class="car-icon-wrapper">
               <img src="assets/pinCar.gif" class="car-icon" style="width: 32px; height: 32px;"/>
             </div>`,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [0, 0]
    });
  }

  ngOnDestroy() {
    if (this.eventSourceSubscription) {
      this.eventSourceSubscription.unsubscribe();
    }
    if (this.ultimaComunicacaoEquipamentoEventSourceSubscription) {
      this.ultimaComunicacaoEquipamentoEventSourceSubscription.unsubscribe();
    }
    if (this.statusCheckIntervalSubscription) {
      this.statusCheckIntervalSubscription.unsubscribe();
    }
  }
}
