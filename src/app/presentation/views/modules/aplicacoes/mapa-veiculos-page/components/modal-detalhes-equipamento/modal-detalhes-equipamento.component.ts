import { BuscarVeiculoCCOIdEquipamentoUseCase } from '@/application/usecase/veiculo-cco/buscar-veiculo-cco-por-idEquipamento.usecase';
import { MODAL_DATA, ModalService } from '@/infrastructure/services/modal/modal.service';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-modal-detalhes-equipamento',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal-detalhes-equipamento.component.html',
  styleUrl: './modal-detalhes-equipamento.component.scss'
})
export class ModalDetalhesEquipamentoComponent {
  private _modalService = inject(ModalService<ModalDetalhesEquipamentoComponent>);
  protected idEquipamento: String = inject(MODAL_DATA) as String;

  constructor(private buscarVeiculoCCOPorIdEquipamento: BuscarVeiculoCCOIdEquipamentoUseCase){
    this.buscarVeiculoCCOPorIdEquipamento.execute("HARPIA_DEV_0003").subscribe()
  }

  fecharModal() {
    this._modalService.dismiss();
  }

  buscaDadosDeVeiculo(idInstituicao: string) {
  }
}
