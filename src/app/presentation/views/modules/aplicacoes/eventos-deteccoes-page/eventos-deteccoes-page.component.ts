import { FiltersInputsComponent } from '@/presentation/shared/components/filters-inputs/filters-inputs.component';
import { Component } from '@angular/core';
import { TableDeteccoesComponent } from "./components/table-deteccoes/table-deteccoes.component";
import { InputSearchComponent } from '@tivic-team/tivic-ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventos-deteccoes-page',
  standalone: true,
  imports: [FiltersInputsComponent, TableDeteccoesComponent, InputSearchComponent, CommonModule],
  templateUrl: './eventos-deteccoes-page.component.html',
  styleUrl: './eventos-deteccoes-page.component.scss'
})
export class EventosDeteccoesPageComponent {

}
