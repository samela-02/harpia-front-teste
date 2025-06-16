import { TimelineDto } from '@/domain/dtos/timeline.dto';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  @Input() timelineList: TimelineDto[];
}
