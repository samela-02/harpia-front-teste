import { InputPesquisaFiltragemComponent } from '@/presentation/components/input-pesquisa-filtragem/input-pesquisa-filtragem.component';
import { Component } from '@angular/core';
import { TableDeteccoesComponent } from "./components/table-deteccoes/table-deteccoes.component";

@Component({
  selector: 'app-eventos-deteccoes-page',
  standalone: true,
  imports: [InputPesquisaFiltragemComponent, TableDeteccoesComponent],
  templateUrl: './eventos-deteccoes-page.component.html',
  styleUrl: './eventos-deteccoes-page.component.scss'
})
export class EventosDeteccoesPageComponent {

}
