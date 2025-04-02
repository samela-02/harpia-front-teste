import { tableModule } from '@/presentation/shared/table.module';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import deteccaoJson from './deteccao-json-teste.json'
import { DeteccoesResponse } from '@/domain/dtos/deteccaoResponse';
import { ModeloPlacaComponent } from '@/presentation/components/modelo-placa/modelo-placa.component';
import { BadgeComponent } from '@tivic-team/tivic-ui';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-table-deteccoes',
  standalone: true,
  imports: [...tableModule, ModeloPlacaComponent, BadgeComponent, CommonModule],
  templateUrl: './table-deteccoes.component.html',
  styleUrl: './table-deteccoes.component.scss'
})

export class TableDeteccoesComponent {
  EVENT_DATA: DeteccoesResponse = deteccaoJson;
  dataSource: DeteccoesResponse = this.EVENT_DATA;
  displayedColumns: string[] = ['imgOriginal','nrPlaca', 'idEquipamento', 'nmEquipamento', 'dtEvento'];


  setColorType(tipoEvento: number) {
   if (tipoEvento == 2) {
     return 'bg-furto';
   } else if (tipoEvento == 3) {
     return 'bg-restricao-judicial';
   } else if (tipoEvento == 1) {
     return 'bg-administrativa';
   } else {
     return 'bg-default';
   }
  }
}

