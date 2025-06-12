import { DeteccaoQueryResponse } from '@/domain/models/query/deteccao-query-response';
import { MODAL_DATA } from '@/infrastructure/services/modal/modal.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-modal-rejeicao-deteccao',
  standalone: true,
  imports: [],
  templateUrl: './modal-rejeicao-deteccao.component.html',
  styleUrl: './modal-rejeicao-deteccao.component.scss'
})
export class ModalRejeicaoDeteccaoComponent {
  protected deteccao: DeteccaoQueryResponse = inject(MODAL_DATA) as DeteccaoQueryResponse;
}
