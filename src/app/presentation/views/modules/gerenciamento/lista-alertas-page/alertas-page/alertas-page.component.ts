import { SetarCdListaAlertaAction } from '@/infrastructure/store/actions/lista-alerta.actions';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ModalService } from '@tivic-team/tivic-ui';
import { ModalFormCreateTipoAlertaComponent } from './components/tipo-alerta/modal-form-create-tipo-alerta/modal-form-create-tipo-alerta.component';
import { TableTipoAlertasComponent } from './components/tipo-alerta/table-tipo-alertas/table-tipo-alertas.component';
import { TableAlertasComponent } from './components/alerta/table-alertas/table-alertas.component';
import { MatDivider } from '@angular/material/divider';
import { ModalFormCreateAlertaComponent } from './components/alerta/modal-form-create-alerta/modal-form-create-alerta.component';

@Component({
  selector: 'app-alertas-page',
  standalone: true,
  imports: [TableTipoAlertasComponent, TableAlertasComponent, MatButtonModule, MatDivider],
  templateUrl: './alertas-page.component.html',
  styleUrl: './alertas-page.component.scss'
})
export class AlertasPageComponent {
  private _store = inject(Store);
  private _cdr = inject(ChangeDetectorRef);
  private _route = inject(ActivatedRoute);
  private cdListaAlerta: number | null = null;

  constructor(){
    this.getIdFromUrl()
    this.setarCdListaAlerta(this.cdListaAlerta)
  }

  private _modalService = inject(ModalService<ModalFormCreateTipoAlertaComponent>);

  // @ViewChild(TableListaAlertasComponent) TableListaAlertasComponent!: TableListaAlertasComponent;
  // table = viewChild<TableListaAlertasComponent>(TableListaAlertasComponent);

  icon = "la la-plus-circle"

  // formGroup: FormGroup = new FormGroup({
  //   idInstituicao: new FormControl<string>("", { nonNullable: true }),
  // });

  // onSearch() {
  //   if (!this.table()) return;
  //   const filters = {
  //     idInstituicao: this.formGroup.get('idInstituicao')?.value
  //   };
  //   this.table().load(filters);
  // }

  cadastrarTipoAlerta() {
    this._modalService.component(ModalFormCreateTipoAlertaComponent).open();
  }

  cadastrarAlerta() {
    this._modalService.component(ModalFormCreateAlertaComponent).open();
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
