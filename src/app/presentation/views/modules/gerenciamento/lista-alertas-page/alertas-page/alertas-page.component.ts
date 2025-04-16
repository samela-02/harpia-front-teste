import { SetarCdListaAlertaAction } from '@/infrastructure/store/actions/lista-alerta.actions';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ModalService } from '@tivic-team/tivic-ui';
import { TableAlertasComponent } from './components/alerta/table-alertas/table-alertas.component';
import { ModalFormCreateTipoAlertaComponent } from './components/tipo-alerta/modal-form-create-tipo-alerta/modal-form-create-tipo-alerta.component';
import { TableTipoAlertasComponent } from './components/tipo-alerta/table-tipo-alertas/table-tipo-alertas.component';

@Component({
  selector: 'app-alertas-page',
  standalone: true,
  imports: [TableTipoAlertasComponent, TableAlertasComponent, MatButtonModule],
  templateUrl: './alertas-page.component.html',
  styleUrl: './alertas-page.component.scss'
})
export class AlertasPageComponent {
  private _store = inject(Store);
  private _route = inject(ActivatedRoute);
  private router = inject(Router)
  private cdListaAlerta: number | null = null;

  constructor() {
    this.getIdFromUrl()
    this.setarCdListaAlerta(this.cdListaAlerta)
  }

  private _modalService = inject(ModalService<ModalFormCreateTipoAlertaComponent>);

  icon = "la la-plus-circle"

  cadastrarTipoAlerta() {
    this._modalService.component(ModalFormCreateTipoAlertaComponent).open();
  }

  cadastrarAlerta() {
    this.router.navigate(['criar-alerta'], { relativeTo: this._route })
  }

  private getIdFromUrl(): void {
    this._route.paramMap.subscribe(params => {
      this.cdListaAlerta = Number(params.get('cdAlerta'))
    });
  }

  public setarCdListaAlerta(cdLista: number) {
    this._store.dispatch(new SetarCdListaAlertaAction(cdLista)).subscribe()
  }
}
