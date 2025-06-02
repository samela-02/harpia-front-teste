import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-chip-status',
  standalone: true,
  imports: [MatChipsModule, CommonModule],
  templateUrl: './chip-status.component.html',
  styleUrl: './chip-status.component.scss'
})
export class ChipStatusComponent {
  @Input() lgAtivo: number;

  buscaSituacao = (lgAtivo: number) => lgAtivo == 1 ? 'Ativo' : "Inativo";
}
