import { FiltersInputsComponent } from '@/presentation/shared/components/filters-inputs/filters-inputs.component';
import { sharedModule } from '@/presentation/shared/shared';
import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ModalService } from '@tivic-team/tivic-ui';
import { FilterEquipamentoComponent } from './components/filter-equipamentos/filter-equipamento.component';
import { ModalFormCreateEquipamentoComponent } from './components/modal-form-create-equipamento/modal-form-create-equipamento.component';
import { TableEquipamentosComponent } from './components/table-equipamentos/table-equipamentos.component';

@Component({
  selector: 'app-lista-equipamentos',
  standalone: true,
  imports: [TableEquipamentosComponent, MatButtonModule, FilterEquipamentoComponent, FiltersInputsComponent, ...sharedModule],
  templateUrl: './lista-equipamentos.component.html',
  styleUrl: './lista-equipamentos.component.scss'
})
export class ListaEquipamentosComponent {
  private _modalService = inject(ModalService<ModalFormCreateEquipamentoComponent>);
  private _formBuilder = inject(FormBuilder);

  @ViewChild(TableEquipamentosComponent) tableEquipamentos!: TableEquipamentosComponent;

  constructor() { }

  icon = "la la-plus-circle"

  formGroup: FormGroup = this._formBuilder.group({
    nmEquipamento: [''],
    idEquipamento: [''],
    nrSerie: [''],
    cdInstituicao: [''],
    cdTipoEquipamento: [''],
    dtAlocacaoInferior: [null],
    dtAlocacaoSuperior: [null],
    dtDelecaoInferior: [null],
    dtDelecaoSuperior: [null]
  });

  table = viewChild<TableEquipamentosComponent>(TableEquipamentosComponent);

  onSearch() {
    if (!this.table()) return;
    const filters = this.formGroup.getRawValue()
    this.table().load(filters);
  }

  cadastrar() {
    this._modalService.component(ModalFormCreateEquipamentoComponent).open();
  }
}
