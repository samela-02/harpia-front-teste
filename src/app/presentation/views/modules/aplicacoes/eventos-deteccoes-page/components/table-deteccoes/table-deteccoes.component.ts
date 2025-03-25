import { tableModule } from '@/presentation/shared/table.module';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import deteccaoJson from './deteccao-json-teste.json'
import { DeteccoesResponse } from '@/domain/dto/deteccaoResponse';
import { ModeloPlacaComponent } from '@/presentation/components/modelo-placa/modelo-placa.component';
import { BadgeComponent } from '@tivic-team/tivic-ui';


@Component({
  selector: 'app-table-deteccoes',
  standalone: true,
  imports: [...tableModule, ModeloPlacaComponent, BadgeComponent],
  templateUrl: './table-deteccoes.component.html',
  styleUrl: './table-deteccoes.component.scss'
})

export class TableDeteccoesComponent {
  EVENT_DATA: DeteccoesResponse = deteccaoJson;
  dataSource: DeteccoesResponse = this.EVENT_DATA;
  displayedColumns: string[] = ['position', 'nrPlaca', 'idEquipamento', 'nmEquipamento', 'dtEvento'];
}
