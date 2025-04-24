import { TruncatePipe } from '@/infrastructure/pipe/truncate.pipe';
import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-info-line',
  standalone: true,
  imports: [TruncatePipe, MatTooltipModule],
  templateUrl: './info-line.component.html'
})
export class InfoLineComponent {
  @Input() icone: string;
  @Input() titulo: string;
  @Input() descricao: string
  @Input() truncate:  number = 30

}
