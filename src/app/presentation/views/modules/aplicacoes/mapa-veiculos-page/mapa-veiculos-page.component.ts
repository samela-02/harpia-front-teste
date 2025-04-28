import { buscarDadosGpsUseCase } from '@/application/usecase/gps-tracker/buscar-dados-gps.usecase';
import { FiltersInputsComponent } from '@/presentation/shared/components/filters-inputs/filters-inputs.component';
import { MapMarkersComponent } from '@/presentation/shared/components/map-markers/map-markers.component';
import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import * as L from 'leaflet';
import { contentMarker } from './helpers/content-marker';
import { CommonModule, DatePipe } from '@angular/common';
import { GpsTrackerQueryResponse } from '@/domain/models/query/gps-tracker-query-response';

export interface EquipmentStatus {
  idEquipamento: string;
  lastCommunicationTime: Date;
  statusColor: 'green' | 'yellow' | 'red';
  nome?: string;
}
@Component({
  selector: 'app-mapa-veiculos-page',
  standalone: true,
  imports: [FiltersInputsComponent, MapMarkersComponent, CommonModule, DatePipe],
  providers: [DatePipe],
  templateUrl: './mapa-veiculos-page.component.html',
  styleUrl: './mapa-veiculos-page.component.scss',
})
export class MapaVeiculosPageComponent implements OnInit, OnDestroy {
  @ViewChild(MapMarkersComponent) mapComponent!: MapMarkersComponent;

  private eventSourceSubscription: Subscription | null = null;
  private statusCheckIntervalSubscription: Subscription | null = null;
  private movingMarkers: Map<string, L.Marker> = new Map();

  public equipmentStatusMap: Map<string, EquipmentStatus> = new Map();
  public markerCount: number = 0;

  constructor(
    private buscarDadosGpsUseCase: buscarDadosGpsUseCase,
    private changeDetectorRef: ChangeDetectorRef,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.bucarDadosGps();
  }

  bucarDadosGps(){
    this.eventSourceSubscription = this.buscarDadosGpsUseCase.execute('TIVIC_PDI').subscribe((response) => {
      try {
        const equipamentoData: GpsTrackerQueryResponse = JSON.parse(response.data);
        console.log(equipamentoData.sensores[0].dtEvento)
        this.updateEquipmentStatus(equipamentoData.idEquipamento, new Date(equipamentoData.sensores[0].dtEvento))

        if (equipamentoData.sensores[0]?.vlLatitude && equipamentoData.sensores[0]?.vlLongitude && equipamentoData.idEquipamento) {
          const novaCoordenada: [number, number] = [equipamentoData.sensores[0].vlLatitude, equipamentoData.sensores[0].vlLongitude];
          this.updateMovingMarker(novaCoordenada, equipamentoData.sensores[0].vlTrueCourse ?? 0, equipamentoData.idEquipamento);
        }

        this.changeDetectorRef.detectChanges();

        if (!this.statusCheckIntervalSubscription) {
          this.statusCheckIntervalSubscription = interval(60000).subscribe(() => {
            this.checkAllEquipmentStatus();
          });
        }

      } catch (error) {
        console.error("Erro ao processar dado do EventSource:", error, response.data);
      }
    });
  }

  private updateEquipmentStatus(idEquipamento: string, communicationTime: Date): void {
    let status = this.equipmentStatusMap.get(idEquipamento);
    if (!status) {
      status = {
        idEquipamento: idEquipamento,
        lastCommunicationTime: communicationTime,
        statusColor: 'green',
        nome: `${idEquipamento}`
      };
    } else {
      status.lastCommunicationTime = communicationTime;
    }
    status.statusColor = this.calculateStatusColor(communicationTime);
    this.equipmentStatusMap.set(idEquipamento, status);
  }

  private calculateStatusColor(lastCommunicationTime: Date): 'green' | 'yellow' | 'red' {
    const now = new Date();
    console.log(now.getTime(), lastCommunicationTime.getTime())
    const diffMinutes = (now.getTime() - lastCommunicationTime.getTime()) / (1000 * 60);

    console.log(diffMinutes.toFixed(0))

    if (diffMinutes < 10) {
      return 'green';
    } else if (diffMinutes < 60) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  private checkAllEquipmentStatus(): void {
    let changed = false;
    this.equipmentStatusMap.forEach((status, id) => {
      const newColor = this.calculateStatusColor(status.lastCommunicationTime);
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
        (iconElement as HTMLElement).style.transform = `rotate(${direction - 90}deg)`;
      }
    }
  }

  private addPopupToMarker(marker: L.Marker, idEquipamento: string): void {
    const status = this.equipmentStatusMap.get(idEquipamento);
    const popupContent = L.DomUtil.create("div");
    const lastUpdateFormatted = status ? this.datePipe.transform(status.lastCommunicationTime, 'dd/MM/yyyy HH:mm:ss') : 'N/A';
    popupContent.innerHTML = contentMarker(`ID: ${idEquipamento}<br>Última Att: ${lastUpdateFormatted}`, "assets/gifteste.gif");

    marker.bindPopup(popupContent);
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
      iconAnchor: [16, 16]
    });
  }

  ngOnDestroy() {
    if (this.eventSourceSubscription) {
      this.eventSourceSubscription.unsubscribe();
    }
    if (this.statusCheckIntervalSubscription) {
      this.statusCheckIntervalSubscription.unsubscribe();
    }
  }
}
