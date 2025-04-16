import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-etapa',
  standalone: true,
  templateUrl: './header-etapa.component.html',
  styleUrl: './header-etapa.component.scss'
})
export class HeaderEtapaComponent {
  @Input() etapa: number;
  @Input() titulo: string;
}
