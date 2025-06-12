import { DeteccaoQueryResponse } from '@/domain/models/query/deteccao-query-response';
import { MODAL_DATA, ModalService } from '@/infrastructure/services/modal/modal.service';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@tivic-team/tivic-ui';
import { FormRejeicaoDeteccaoComponent } from './form-rejeicao-deteccao/form-rejeicao-deteccao.component';
import { ModalMediator } from '@/domain/mediator/modal-mediator';
import { EventosModal } from '@/domain/enums/evento-modal';

@Component({
  selector: 'app-modal-rejeicao-deteccao',
  standalone: true,
  imports: [ButtonComponent, FormRejeicaoDeteccaoComponent],
  templateUrl: './modal-rejeicao-deteccao.component.html',
  styleUrl: './modal-rejeicao-deteccao.component.scss'
})
export class ModalRejeicaoDeteccaoComponent {
  protected deteccao: DeteccaoQueryResponse = inject(MODAL_DATA) as DeteccaoQueryResponse;
  private _modalServiceRejeicaoDeteccao = inject(ModalService<ModalRejeicaoDeteccaoComponent>);
  private _modalMediator = inject(ModalMediator);

  fecharModal() {
    this._modalServiceRejeicaoDeteccao.component(ModalRejeicaoDeteccaoComponent).dismiss(this.deteccao);
  }

  fecharTodosModais() {
    this.fecharModal();
    this._modalMediator.emitirEvento(EventosModal.FECHAR_MODAL_DETALHES_DETECCAO);
  }
}
