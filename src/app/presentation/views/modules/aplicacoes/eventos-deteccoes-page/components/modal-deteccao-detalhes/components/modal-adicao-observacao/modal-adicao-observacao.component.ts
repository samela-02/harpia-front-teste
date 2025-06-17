import { DeteccaoQueryResponse } from '@/domain/models/query/deteccao-query-response';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@tivic-team/tivic-ui';
import { FormAdicaoObservacaoComponent } from "./form-adicao-observacao/form-adicao-observacao.component";
import { MODAL_DATA, ModalService } from '@/infrastructure/services/modal/modal.service';
import { Mediator } from '@/domain/mediator/mediator';
import { EventoMediator } from '@/domain/enums/evento-mediator';

@Component({
  selector: 'app-modal-adicao-observacao',
  standalone: true,
  imports: [ButtonComponent, FormAdicaoObservacaoComponent],
  templateUrl: './modal-adicao-observacao.component.html',
  styleUrl: './modal-adicao-observacao.component.scss'
})
export class ModalAdicaoObservacaoComponent {
  protected deteccao: DeteccaoQueryResponse = inject(MODAL_DATA) as DeteccaoQueryResponse;
  private _modalServiceAdicaoObservacao = inject(ModalService<ModalAdicaoObservacaoComponent>);

  constructor(private _mediator: Mediator) {}

  fecharModal(): void {
    this._modalServiceAdicaoObservacao.component(ModalAdicaoObservacaoComponent).dismiss(this.deteccao);
    this._mediator.emitirEvento(EventoMediator.BUSCAR_MOVIMENTACOES_APOS_ADICIONAR_OBSERVACAO);
  }
}
