import { BuscarComandoUseCase } from '@/application/usecase/comando/buscar-comando.usecase';
import { SolicitarWebRtcUseCase } from '@/application/usecase/comando/solicitar-webrtc.usecase';
import { BuscarComponentesUseCase } from '@/application/usecase/componente/buscar-componentes.usecase';
import { BuscarVeiculoCCOIdEquipamentoUseCase } from '@/application/usecase/veiculo-cco/buscar-veiculo-cco-por-idEquipamento.usecase';
import { ComandoDTo } from '@/domain/dtos/comando.dto';
import { VariacaoEnum } from '@/domain/enums/variacao.enum';
import { ComponentesFilter, ComponentesProps } from '@/domain/filters/componente/componente.filter';
import { Componente } from '@/domain/models/command/componentes';
import { VeiculoCCOQueryResponse } from '@/domain/models/query/veiculo-cco-query-response';
import { MODAL_DATA, ModalService } from '@/infrastructure/services/modal/modal.service';
import { CardDetailsComponent } from '@/presentation/shared/components/card-details/card-details.component';
import { InfoLineComponent } from '@/presentation/shared/components/info-line/info-line.component';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '@tivic-team/tivic-ui';
import { v4 as uuidv4 } from 'uuid';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-modal-detalhes-equipamento',
  standalone: true,
  imports: [ButtonComponent, MatButtonModule, CardDetailsComponent, InfoLineComponent, MatSelectModule],
  templateUrl: './modal-detalhes-equipamento.component.html',
  styleUrl: './modal-detalhes-equipamento.component.scss'
})
export class ModalDetalhesEquipamentoComponent {
  private _modalService = inject(ModalService<ModalDetalhesEquipamentoComponent>);
  private _modalContentService = inject(ModalService<ModalContentComponent>);
  protected idEquipamento: string = inject(MODAL_DATA) as string;

  public cameraSelecionada: string = ''
  public veiculo: VeiculoCCOQueryResponse;
  public componentes: Componente[];
  public aguardandoSnapshot: boolean = false

  constructor(
    private buscarVeiculoCCOPorIdEquipamento: BuscarVeiculoCCOIdEquipamentoUseCase,
    private buscarComponentesUseCase: BuscarComponentesUseCase,
    private solicitaComandoSnapshot: SolicitarWebRtcUseCase,
    private buscarRetornoComandoUseCase: BuscarComandoUseCase
  ){
    this.buscarVeiculo(this.idEquipamento);
    this.buscarComponentes();
  }

  fecharModal() {
    this._modalService.dismiss();
  }

  buscarVeiculo(idEquipamento: string) {
    this.buscarVeiculoCCOPorIdEquipamento.execute(idEquipamento).subscribe((resp) => {
      this.veiculo = resp.data
    })
  }

  buscarComponentes() {
    const props: ComponentesProps = {
      cdTipoComponente: 1,
      idEquipamento: this.idEquipamento
    }
    const filter = new ComponentesFilter(props)
    this.buscarComponentesUseCase.execute(filter).subscribe(resp => {
      this.componentes = resp.data.dados
      this.cameraSelecionada = resp.data.dados[0].idComponente
    })
  }

  solicitarSnapshot() {
    const idComando = uuidv4()
    const comando: ComandoDTo = {
      idComando: idComando,
      idComponente: this.cameraSelecionada,
      idEquipamento: this.idEquipamento,
      tpVariacao: VariacaoEnum.ORI
    }
    this.solicitaComandoSnapshot.execute(comando).subscribe(resp => {
      this.buscarRetornoComando(idComando);
    });
  }

  buscarRetornoComando(idComando: string) {
    this.aguardandoSnapshot = true
    this.buscarRetornoComandoUseCase.execute(idComando).subscribe({
      next: (response) => {
        this.aguardandoSnapshot = false
        const content = JSON.parse(response.data)
        this._modalContentService.component(ModalContentComponent).open(content);
      }, error () {
        this.aguardandoSnapshot = false
      }
    });
  }
}
