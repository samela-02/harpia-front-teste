import { TipoAlertaFilter, TipoAlertaProps } from '@/domain/filters/tipo-alerta/tipo-alerta.filter';
import { SetarCdListaAlertaAction } from '@/infrastructure/store/actions/lista-alerta.actions';
import { BuscarTiposAlertasAction } from '@/infrastructure/store/actions/tipo-alerta.actions';
import { FiltersInputsComponent } from '@/presentation/shared/components/filters-inputs/filters-inputs.component';
import { Component, inject, viewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ModalService } from '@tivic-team/tivic-ui';
import { TableAlertasComponent } from './components/alerta/table-alertas/table-alertas.component';
import { ModalFormCreateTipoAlertaComponent } from './components/tipo-alerta/modal-form-create-tipo-alerta/modal-form-create-tipo-alerta.component';
import { TableTipoAlertasComponent } from './components/tipo-alerta/table-tipo-alertas/table-tipo-alertas.component';
import { VerifyInstitutionDirective } from '@/infrastructure/directives/verify-institution.directive';

@Component({
  selector: 'app-alertas-page',
  standalone: true,
  imports: [TableTipoAlertasComponent, TableAlertasComponent, MatButtonModule, FiltersInputsComponent, VerifyInstitutionDirective],
  templateUrl: './alertas-page.component.html',
  styleUrl: './alertas-page.component.scss'
})
export class AlertasPageComponent {
  private _store = inject(Store);
  private _route = inject(ActivatedRoute);
  private router = inject(Router)
  private cdListaAlerta: number | null = null;
  private _modalService = inject(ModalService<ModalFormCreateTipoAlertaComponent>);
  icon = "la la-plus-circle"
  public idInstituicao = this.route.snapshot.params['idInstituicao'];

  table = viewChild<TableAlertasComponent>(TableAlertasComponent);

  constructor(private route: ActivatedRoute) {
    this.getIdFromUrl()
    this.setarCdListaAlerta(this.cdListaAlerta)
    this.loadTiposDeAlertas()
  }

  formGroup: FormGroup = new FormGroup({
    nrPlaca: new FormControl<string>("", { nonNullable: true }),
  });

  onSearch() {
    if (!this.table()) return;
    const filters = {
      nrPlaca: this.formGroup.get('nrPlaca')?.value,
    };
    this.table().load(filters);
  }

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

  loadTiposDeAlertas() {
    const paginationProps: TipoAlertaProps = {
      page: 0,
      size: 10
    };
    const filter = new TipoAlertaFilter(paginationProps);
    this._store.dispatch(new BuscarTiposAlertasAction(filter)).subscribe()
  }

  public setarCdListaAlerta(cdLista: number) {
    this._store.dispatch(new SetarCdListaAlertaAction(cdLista)).subscribe()
  }
}
