import { CardDetailsComponent } from '@/presentation/shared/components/card-details/card-details.component';
import { InfoLineComponent } from '@/presentation/shared/components/info-line/info-line.component';
import { MapMarkersComponent } from '@/presentation/shared/components/map-markers/map-markers.component';
import { SetColorByNivel } from '@/presentation/shared/helpers/set-color-by-nivel.helper';
import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent, MODAL_DATA, ModalService } from '@tivic-team/tivic-ui';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-modal-deteccao-detalhes',
  standalone: true,
  imports: [ButtonComponent, MapMarkersComponent, CommonModule, InfoLineComponent, CardDetailsComponent, MatTabsModule ],
  templateUrl: './modal-deteccao-detalhes.component.html',
  styleUrl: './modal-deteccao-detalhes.component.scss'
})
export class ModalDeteccaoDetalhesComponent {

  protected deteccao: any = inject(MODAL_DATA) || null;
  private _modalService = inject(ModalService<ModalDeteccaoDetalhesComponent>)
  fecharModal() {
    this._modalService.dismiss();
  }

  public getColorByNivel(nivel: number): string {
    return SetColorByNivel.setColor(nivel);
  }
}