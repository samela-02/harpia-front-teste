import { Alerta } from '@/domain/models/command/alerta';
import { CardDetailsComponent } from '@/presentation/shared/components/card-details/card-details.component';
import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonComponent, MODAL_DATA, ModalService } from '@tivic-team/tivic-ui';
import { InfoLineComponent } from './components/info-line/info-line.component';
import { AlertaQueryResponse } from '@/domain/models/query/alerta-query-response';
import { SetColorByNivel } from '@/presentation/shared/helpers/set-color-by-nivel.helper';
import { Store } from '@ngxs/store';
import { AlertaSelectors } from '@/infrastructure/store/selectors/alerta.selectors';
import { BuscarVeiculoPorPlacaAction } from '@/infrastructure/store/actions/alerta.actions';
import { VeiculoDeteccaoQueryResponse } from '@/domain/models/query/veiculo-deteccao-query-response';

@Component({
  selector: 'app-modal-detalhes-alerta',
  standalone: true,
  imports: [DatePipe, ButtonComponent, CardDetailsComponent, InfoLineComponent],
  templateUrl: './modal-detalhes-alerta.component.html',
  styleUrl: './modal-detalhes-alerta.component.scss'
})
export class ModalDetalhesAlertaComponent {
  private _modalService = inject(ModalService<ModalDetalhesAlertaComponent>);
  private _store = inject(Store)

  public icon: string = "la la-camera-retro"
  public tituloModal: string;
  public veiculoState = this._store.selectSignal(AlertaSelectors.veiculo);
  public veiculo: VeiculoDeteccaoQueryResponse;
  protected alerta = inject(MODAL_DATA) as AlertaQueryResponse;

  constructor(){
    this.loadVeiculo(this.alerta.veiculoQueryResponse.nrPlaca)
  }

  fecharModal() {
    this._modalService.dismiss();
  }

  public getColorByNivel(nivel: number): string {
    return SetColorByNivel.setColor(nivel);
  }

  loadVeiculo(nrPlaca: string) {
    this._store.dispatch(new BuscarVeiculoPorPlacaAction(nrPlaca)).subscribe(() => {
      this.veiculo = this.veiculoState().data
    });
  }
}
