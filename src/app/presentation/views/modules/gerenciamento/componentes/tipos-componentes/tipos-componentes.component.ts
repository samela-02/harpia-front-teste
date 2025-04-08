import { FiltersInputsComponent } from '@/presentation/components/filters-inputs/filters-inputs.component';
import { sharedModule } from '@/presentation/shared/shared';
import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TableTiposComponentesComponent } from './components/table-tipos-componentes/table-tipos-componentes.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalFormCreateTipoComponenteComponent } from './components/modal-form-create-tipo-componente/modal-form-create-tipo-componente.component';
import { ModalService } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-tipos-componentes',
  standalone: true,
  imports: [MatButtonModule, FiltersInputsComponent, ...sharedModule, TableTiposComponentesComponent],
  templateUrl: './tipos-componentes.component.html',
  styleUrl: './tipos-componentes.component.scss'
})
export class TiposComponentesComponent {
  private _modalService = inject(ModalService<ModalFormCreateTipoComponenteComponent>);
  @ViewChild(TableTiposComponentesComponent) tableTiposComponentes!: TableTiposComponentesComponent;
  constructor(
  ) { }
  icon = "la la-plus-circle"

  formGroup: FormGroup = new FormGroup({
    nmTipoComponente: new FormControl<string>("", { nonNullable: true }),
  });

  table = viewChild<TableTiposComponentesComponent>(TableTiposComponentesComponent);

  onSearch() {
    if (!this.table()) return;
    const filters = {
      nmTipoComponente: this.formGroup.get('nmTipoComponente')?.value,
    };
    this.table().load(filters);
  }

  cadastrar() {
    this._modalService.component(ModalFormCreateTipoComponenteComponent).open();
  }
}
