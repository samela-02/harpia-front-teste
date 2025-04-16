import { Alerta } from '@/domain/models/command/alerta';
import { CardDetailsComponent } from '@/presentation/shared/components/card-details/card-details.component';
import { JsonPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonComponent, MODAL_DATA, ModalService } from '@tivic-team/tivic-ui';
import { InfoLineComponent } from './components/info-line/info-line.component';
import { AlertaQueryResponse } from '@/domain/models/query/alerta-query-response';

@Component({
  selector: 'app-modal-detalhes-alerta',
  standalone: true,
  imports: [ButtonComponent, CardDetailsComponent, InfoLineComponent],
  templateUrl: './modal-detalhes-alerta.component.html',
  styleUrl: './modal-detalhes-alerta.component.scss'
})
export class ModalDetalhesAlertaComponent {
  public icon: string = "la la-camera-retro"
  public tituloModal: string;
  protected alerta = inject(MODAL_DATA) as AlertaQueryResponse;
  private _modalService = inject(ModalService<ModalDetalhesAlertaComponent>);

  fecharModal() {
    this._modalService.dismiss();
  }
}
