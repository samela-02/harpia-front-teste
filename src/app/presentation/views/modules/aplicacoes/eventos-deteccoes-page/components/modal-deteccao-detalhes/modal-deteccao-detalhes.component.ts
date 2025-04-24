import { SetColorByNivel } from '@/presentation/shared/helpers/set-color-by-nivel.helper';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonComponent, MODAL_DATA, ModalService } from '@tivic-team/tivic-ui';
import { EventoContentModalComponent } from './components/evento-content-modal/evento-content-modal.component';
import { MaisDetalhesContentModalComponent } from './components/mais-detalhes-content-modal/mais-detalhes-content-modal.component';

@Component({
  selector: 'app-modal-deteccao-detalhes',
  standalone: true,
  imports: [ButtonComponent, CommonModule, MatTabsModule, EventoContentModalComponent, MaisDetalhesContentModalComponent ],
  templateUrl: './modal-deteccao-detalhes.component.html',
  styleUrl: './modal-deteccao-detalhes.component.scss',
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