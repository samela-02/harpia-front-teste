import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { ButtonComponent, ModalService } from '@tivic-team/tivic-ui';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalFormCreateListaAlertaComponent } from './components/modal-form-create-lista-alerta/modal-form-create-lista-alerta.component';
import { TableListaAlertasComponent } from './components/table-lista-alerta/table-lista-alertas.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FiltersInputsComponent } from '@/presentation/components/filters-inputs/filters-inputs.component';
import { FilterListaAlertaComponent } from './components/filter-lista-alerta/filter-lista-alerta.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lista-alertas-page',
  standalone: true,
  imports: [
    MatButtonModule,
    FiltersInputsComponent,
    FilterListaAlertaComponent,
    RouterModule,
    MatTooltipModule,
    TableListaAlertasComponent
],
  templateUrl: './lista-alertas-page.component.html',
  styleUrl: './lista-alertas-page.component.scss'
})
export class ListaAlertasPageComponent {
  private _modalService = inject(ModalService<ModalFormCreateListaAlertaComponent>);

  @ViewChild(TableListaAlertasComponent) TableListaAlertasComponent!: TableListaAlertasComponent;
  table = viewChild<TableListaAlertasComponent>(TableListaAlertasComponent);

  icon = "la la-plus-circle"

  formGroup: FormGroup = new FormGroup({
    idInstituicao: new FormControl<string>("", { nonNullable: true }),
  });

  onSearch() {
    if (!this.table()) return;
    const filters = {
      idInstituicao: this.formGroup.get('idInstituicao')?.value
    };
    this.table().load(filters);
  }

  cadastrar() {
    this._modalService.component(ModalFormCreateListaAlertaComponent).open();
  }
}
