import { SetColorByNivel } from '@/presentation/shared/helpers/set-color-by-nivel.helper';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonComponent, MODAL_DATA, ModalService } from '@tivic-team/tivic-ui';
import { EventoContentModalComponent } from './components/evento-content-modal/evento-content-modal.component';
import { MaisDetalhesContentModalComponent } from './components/mais-detalhes-content-modal/mais-detalhes-content-modal.component';
import { Store } from '@ngxs/store';
import { buscarAlertaPorCdAction } from '@/infrastructure/store/actions/alerta.actions';
import { DeteccaoQueryResponse } from '@/domain/models/query/deteccao-query-response';

@Component({
  selector: 'app-modal-deteccao-detalhes',
  standalone: true,
  imports: [ButtonComponent, CommonModule, MatTabsModule, EventoContentModalComponent, MaisDetalhesContentModalComponent ],
  templateUrl: './modal-deteccao-detalhes.component.html',
  styleUrl: './modal-deteccao-detalhes.component.scss',
})
export class ModalDeteccaoDetalhesComponent {

  private _store = inject(Store);
  protected deteccao: DeteccaoQueryResponse = inject(MODAL_DATA) as DeteccaoQueryResponse;
  private _modalService = inject(ModalService<ModalDeteccaoDetalhesComponent>)

  constructor() {
    this.BuscarDadosDeAlerta(this.deteccao?.cdAlerta)
  }

  fecharModal() {
    this._modalService.dismiss();
  }

  private BuscarDadosDeAlerta(cdAlerta: number) {
    this._store.dispatch(new buscarAlertaPorCdAction(cdAlerta)).subscribe(() => {
    });
  }

  public getColorByNivel(nivel: number): string {
    return SetColorByNivel.setColor(nivel);
  }
}
