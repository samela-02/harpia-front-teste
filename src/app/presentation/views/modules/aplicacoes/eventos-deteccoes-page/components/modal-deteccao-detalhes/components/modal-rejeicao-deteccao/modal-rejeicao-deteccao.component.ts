import { DeteccaoQueryResponse } from '@/domain/models/query/deteccao-query-response';
import { MODAL_DATA, ModalService } from '@/infrastructure/services/modal/modal.service';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@tivic-team/tivic-ui';
import { FormRejeicaoDeteccaoComponent } from './form-rejeicao-deteccao/form-rejeicao-deteccao.component';
import { Mediator } from '@/domain/mediator/mediator';
import { EventosMediator } from '@/domain/enums/evento-mediator';

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
  private _modalMediator = inject(Mediator);

  fecharModal() {
    this._modalServiceRejeicaoDeteccao.component(ModalRejeicaoDeteccaoComponent).dismiss(this.deteccao);
  }

  fecharTodosModais() {
    this.fecharModal();
    this._modalMediator.emitirEvento(EventosMediator.FECHAR_MODAL_DETALHES_DETECCAO);
  }
}
