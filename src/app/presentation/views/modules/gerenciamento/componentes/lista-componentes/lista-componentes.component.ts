import { FiltersInputsComponent } from '@/presentation/shared/components/filters-inputs/filters-inputs.component';
import { sharedModule } from '@/presentation/shared/shared';
import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ModalService } from '@tivic-team/tivic-ui';
import { TableComponentesComponent } from './components/table-componentes/table-componentes.component';
import { FilterComponenteComponent } from './components/filter-componente/filter-componente.component';
import { ModalFormCreateComponenteComponent } from './components/modal-form-create-componente/modal-form-create-componente.component';

@Component({
  selector: 'app-lista-componente',
  standalone: true,
  imports: [TableComponentesComponent, MatButtonModule, FilterComponenteComponent, FiltersInputsComponent, ...sharedModule],
  templateUrl: './lista-componentes.component.html',
  styleUrl: './lista-componentes.component.scss'
})
export class ListaComponentesComponent {
  private _modalService = inject(ModalService<ModalFormCreateComponenteComponent>);
  private _formBuilder = inject(FormBuilder);

  @ViewChild(TableComponentesComponent) tableComponentes!: TableComponentesComponent;

  constructor() { }

  icon = "la la-plus-circle"

  formGroup: FormGroup = this._formBuilder.group({
    nmComponente: [''],
    idComponente: [''],
    cdEquipamento: [''],
    cdTipoComponente: [''],
    dtDelecaoInferior: [null],
    dtDelecaoSuperior: [null]
  });

  table = viewChild<TableComponentesComponent>(TableComponentesComponent);

  onSearch() {
    if (!this.table()) return;
    const filters = this.formGroup.getRawValue()
    this.table().load(filters);
  }

  cadastrar() {
    this._modalService.component(ModalFormCreateComponenteComponent).open();
  }
}
