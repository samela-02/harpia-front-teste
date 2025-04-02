import { Component } from '@angular/core';
import { ButtonComponent } from '@tivic-team/tivic-ui';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-pastas-alertas-page',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterModule,
    MatTooltipModule
  ],
  templateUrl: './pastas-alertas-page.component.html',
  styleUrl: './pastas-alertas-page.component.scss'
})
export class PastasAlertasPageComponent {

}
