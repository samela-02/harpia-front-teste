import { TipoAlertaProps } from '@/domain/filters/tipo-alerta/tipo-alerta.filter';
import { SetarBreadcrumbAction } from '@/infrastructure/store/actions/breadcrumb.action';
import { BuscarTiposAlertasAction } from '@/infrastructure/store/actions/tipo-alerta.actions';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Store } from '@ngxs/store';
import { TableTipoAlertasComponent } from './components/table-tipo-alertas/table-tipo-alertas.component';
import { ButtonComponent } from '@tivic-team/tivic-ui';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-alertas-page',
  standalone: true,
  imports: [TableTipoAlertasComponent, MatButtonModule],
  templateUrl: './alertas-page.component.html',
  styleUrl: './alertas-page.component.scss'
})
export class AlertasPageComponent {
  private _store = inject(Store);
  private _cdr = inject(ChangeDetectorRef);
  private _route = inject(ActivatedRoute);

  // private _modalService = inject(ModalService<ModalFormCreateListaAlertaComponent>);

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

  cadastrar() {
    // this._modalService.component(ModalFormCreateListaAlertaComponent).open();
  }
}
