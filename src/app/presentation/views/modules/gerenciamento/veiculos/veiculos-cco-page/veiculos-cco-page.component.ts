import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from '@tivic-team/tivic-ui';
import { TableVeiculosCCOComponent } from './components/table-veiculos-cco/table-veiculos-cco.component';
import { FiltersInputsComponent } from '@/presentation/shared/components/filters-inputs/filters-inputs.component';
import { FilterVeiculoCCOComponent } from './components/filter-veiculo-cco/filter-veiculo-cco.component';
import { MatButtonModule } from '@angular/material/button';
import { ModalFormCreateVeiculoCCOComponent } from './components/modal-form-create-veiculo-cco/modal-form-create-veiculo-cco.component';

@Component({
  selector: 'app-veiculos-cco-page',
  standalone: true,
  imports: [FiltersInputsComponent, FilterVeiculoCCOComponent, TableVeiculosCCOComponent, MatButtonModule],
  templateUrl: './veiculos-cco-page.component.html',
  styleUrl: './veiculos-cco-page.component.scss'
})
export class VeiculosCcoPageComponent {
  private _modalService = inject(ModalService<ModalFormCreateVeiculoCCOComponent>);
  private _formBuilder = inject(FormBuilder);

  @ViewChild(TableVeiculosCCOComponent) tableVeiculosCCO!: TableVeiculosCCOComponent;

  icon = "la la-plus-circle"

  formGroup: FormGroup = this._formBuilder.group({
    nrPlaca: [''],
    nmMarca: [''],
    nmModelo: [''],
    corVeiculo: [''],
    lgAtivo: [''],
    dtDelecaoInferior: [null],
    dtDelecaoSuperior: [null]
  });

  table = viewChild<TableVeiculosCCOComponent>(TableVeiculosCCOComponent);

  onSearch() {
    if (!this.table()) return;
    const filters = this.formGroup.getRawValue()
    this.table().load(filters);
  }

  cadastrar() {
    this._modalService.component(ModalFormCreateVeiculoCCOComponent).open();
  }
}
