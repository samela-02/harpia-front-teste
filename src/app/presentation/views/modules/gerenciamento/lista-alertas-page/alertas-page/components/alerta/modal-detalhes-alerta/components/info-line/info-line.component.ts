import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-line',
  standalone: true,
  imports: [],
  templateUrl: './info-line.component.html'
})
export class InfoLineComponent {
  @Input() icone: string;
  @Input() titulo: string;
  @Input() descricao: string

}
