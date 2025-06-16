import { DeteccaoQueryResponse } from '@/domain/models/query/deteccao-query-response';
import { Component, inject } from '@angular/core';
import { MODAL_DATA } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-modal-adicao-observacao',
  standalone: true,
  imports: [],
  templateUrl: './modal-adicao-observacao.component.html',
  styleUrl: './modal-adicao-observacao.component.scss'
})
export class ModalAdicaoObservacaoComponent {
  protected deteccao: DeteccaoQueryResponse = inject(MODAL_DATA) as DeteccaoQueryResponse;
}
