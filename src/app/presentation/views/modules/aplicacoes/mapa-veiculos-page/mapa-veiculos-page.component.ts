import { buscarDadosGpsUseCase } from '@/application/usecase/gps-tracker/buscar-dados-gps.usecase';
import { FiltersInputsComponent } from '@/presentation/shared/components/filters-inputs/filters-inputs.component';
import { MapMarkersComponent } from '@/presentation/shared/components/map-markers/map-markers.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mapa-veiculos-page',
  standalone: true,
  imports: [FiltersInputsComponent, MapMarkersComponent],
  templateUrl: './mapa-veiculos-page.component.html',
  styleUrl: './mapa-veiculos-page.component.scss'
})
export class MapaVeiculosPageComponent {
  constructor(private buscarDadosGpsUseCase: buscarDadosGpsUseCase){
    this.buscarDadosGpsUseCase.execute('TIVIC_PDI').subscribe()
  }

}
