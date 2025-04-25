import { buscarDadosGpsUseCase } from '@/application/usecase/gps-tracker/buscar-dados-gps.usecase';
import { FiltersInputsComponent } from '@/presentation/shared/components/filters-inputs/filters-inputs.component';
import { MapMarkersComponent } from '@/presentation/shared/components/map-markers/map-markers.component';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
import { contentMarker } from './helpers/content-marker';
import { InfoLineComponent } from '@/presentation/shared/components/info-line/info-line.component';
@Component({
  selector: 'app-mapa-veiculos-page',
  standalone: true,
  imports: [FiltersInputsComponent, MapMarkersComponent],
  templateUrl: './mapa-veiculos-page.component.html',
  styleUrl: './mapa-veiculos-page.component.scss'
})
export class MapaVeiculosPageComponent implements OnDestroy {
  @ViewChild(MapMarkersComponent) mapComponent!: MapMarkersComponent;

  private subscription: Subscription | null = null;
  private movingMarkers: Map<string, L.Marker> = new Map();
  public markerCount: number = 0;

  constructor(private buscarDadosGpsUseCase: buscarDadosGpsUseCase) {}

  ngOnInit(): void {
    this.bucarDadosGps()
  }

  bucarDadosGps(){
    this.subscription = this.buscarDadosGpsUseCase.execute('TIVIC_PDI').subscribe((response) => {
      console.log(response)
      if (response.sensores[0].vlLatitude && response.sensores[0].vlLongitude && response.idEquipamento) {
        const novaCoordenada: [number, number] = [response.sensores[0].vlLatitude, response.sensores[0].vlLongitude]
        this.updateMovingMarker(novaCoordenada, response.sensores[0].vlTrueCourse, response.idEquipamento)
        console.log(this.markerCount)
      }
    });
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
    this.addPopupToMarker(newMarker);
    this.updateMarkerIcon(newMarker, direction);
    this.movingMarkers.set(idEquipamento, newMarker);
    this.markerCount++;
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

  private addPopupToMarker(marker: L.Marker): void {
    const popupContent = L.DomUtil.create("div");
    popupContent.innerHTML = contentMarker("", "assets/gifteste.gif");

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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.markerCount = this.movingMarkers.size;
  }
}
