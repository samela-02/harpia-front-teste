import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngxs/store';
import { ButtonComponent, MODAL_DATA, ModalService } from '@tivic-team/tivic-ui';
import { ModalFormListaAlertaUpdateComponent } from '../modal-form-update-lista-alerta/modal-form-update-lista-alerta.component';
import { SetarBreadcrumbAction } from '@/infrastructure/store/actions/breadcrumb.action';
import { Router } from '@angular/router';
import { ListaAlerta } from '@/domain/models/command/lista-alerta';

@Component({
  selector: 'app-modal-options',
  standalone: true,
  imports: [MatButtonModule, ButtonComponent],
  templateUrl: './modal-options.component.html',
  styleUrl: './modal-options.component.scss'
})
export class ModalOptionsComponent {
  private _store = inject(Store);
  private _router = inject(Router);
  private _modalService = inject(ModalService<ModalOptionsComponent>);

  protected listaAlerta: ListaAlerta = inject(MODAL_DATA) as ListaAlerta;
  public tituloModal: string;

  fecharModal() {
    this._modalService.dismiss();
  }

  openModalUpdate(){
    this.fecharModal()
    this._modalService.component(ModalFormListaAlertaUpdateComponent).open(this.listaAlerta)
  }

  public setarBreadcrumb(listaAlerta: ListaAlerta) {
    this._store.dispatch(new SetarBreadcrumbAction(listaAlerta.nmListaAlerta))
  }

  redirectPageAlerts() {
    this.fecharModal()
    this.setarBreadcrumb(this.listaAlerta);
    this._router.navigate(['/gerenciamento/lista-alertas',this.listaAlerta.idInstituicao, this.listaAlerta.cdListaAlerta]);
  }
}
