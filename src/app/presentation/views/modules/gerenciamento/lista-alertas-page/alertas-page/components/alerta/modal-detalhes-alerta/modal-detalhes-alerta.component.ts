import { Alerta } from '@/domain/models/command/alerta';
import { CardDetailsComponent } from '@/presentation/shared/components/card-details/card-details.component';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonComponent, CustomDialogService, makeDeleteCustomDialog, MODAL_DATA, ModalService, SnackbarService } from '@tivic-team/tivic-ui';
import { InfoLineComponent } from './components/info-line/info-line.component';
import { AlertaQueryResponse } from '@/domain/models/query/alerta-query-response';
import { SetColorByNivel } from '@/presentation/shared/helpers/set-color-by-nivel.helper';
import { Store } from '@ngxs/store';
import { AlertaSelectors } from '@/infrastructure/store/selectors/alerta.selectors';
import { BuscarAlertaAction, BuscarVeiculoPorPlacaAction } from '@/infrastructure/store/actions/alerta.actions';
import { VeiculoDeteccaoQueryResponse } from '@/domain/models/query/veiculo-deteccao-query-response';
import { DesativarAlertaUseCase } from '@/application/usecase/alerta/desativar-alerta..usecase';
import { AlertaFilter, AlertaProps } from '@/domain/filters/alerta/alerta.filter';
import { ListaAlertaSelectors } from '@/infrastructure/store/selectors/lista-alerta.selectors';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-detalhes-alerta',
  standalone: true,
  imports: [DatePipe, MatButtonModule, ButtonComponent, CardDetailsComponent, InfoLineComponent, CommonModule],
  templateUrl: './modal-detalhes-alerta.component.html',
  styleUrl: './modal-detalhes-alerta.component.scss'
})
export class ModalDetalhesAlertaComponent {
  private _modalService = inject(ModalService<ModalDetalhesAlertaComponent>);
  private _store = inject(Store)
  private _snackbar = inject(SnackbarService);
  private cdListaAlerta = this._store.selectSignal(ListaAlertaSelectors.cdListaAlerta);
  private _customDialog = inject(CustomDialogService);

  public icon: string = "la la-camera-retro"
  public tituloModal: string;
  public veiculoState = this._store.selectSignal(AlertaSelectors.veiculo);
  public veiculo: VeiculoDeteccaoQueryResponse;
  protected alerta = inject(MODAL_DATA) as AlertaQueryResponse;

  @Output() cadastroSucesso = new EventEmitter<void>();

  constructor(private desativarAlertaUseCase: DesativarAlertaUseCase){
    this.loadVeiculo(this.alerta.veiculoQueryResponse.nrPlaca)
  }

  fecharModal() {
    this._modalService.dismiss();
  }

  public getColorByNivel(nivel: number): string {
    return SetColorByNivel.setColor(nivel);
  }

  loadVeiculo(nrPlaca: string) {
    console.log(nrPlaca)
    this._store.dispatch(new BuscarVeiculoPorPlacaAction(nrPlaca)).subscribe(() => {
      this.veiculo = this.veiculoState().data
      console.log(this.veiculoState().data)
    });
  }

  desativarAlerta(alerta: AlertaQueryResponse) {
    this.desativarAlertaUseCase.execute(alerta.cdAlerta).subscribe({
      next: () => {
        this._snackbar.success('Alerta desativado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTabelaAlerta()
      },
      error: (error) => {
        this._snackbar.error(error.message)
      }
    })
  }

  confirmarDesativacaoDeAlerta(alerta: AlertaQueryResponse) {
    const dialog = this._customDialog.warn(makeDeleteCustomDialog({
      title: "Desativar Alerta",
      value: `o alerta?`
    }));
    return this._customDialog.afterClosed(dialog).subscribe((confirm) => {
      if (confirm) {
        this.desativarAlerta(alerta)
      }
    });
  }

  loadTabelaAlerta() {
    const paginationProps: AlertaProps = {
      page: 0,
      cdListaAlerta: this.cdListaAlerta()
    };
    const filter = new AlertaFilter(paginationProps);
    this._store.dispatch(new BuscarAlertaAction(filter)).subscribe(() => {
    })
  }
}
