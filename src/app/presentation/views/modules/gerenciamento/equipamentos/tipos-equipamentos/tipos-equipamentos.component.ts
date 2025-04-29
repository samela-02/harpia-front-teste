import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { ModalService } from '@tivic-team/tivic-ui';
import { ModalFormCreateTipoEquipamentoComponent } from './components/modal-form-create-tipo-equipamento/modal-form-create-tipo-equipamento.component';
import { TableTiposEquipamentosComponent } from './components/table-tipos-equipamentos/table-tipos-equipamentos.component';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FiltersInputsComponent } from '@/presentation/shared/components/filters-inputs/filters-inputs.component';
import { sharedModule } from '@/presentation/shared/shared';

@Component({
  selector: 'app-tipos-equipamentos',
  standalone: true,
  imports: [TableTiposEquipamentosComponent, MatButtonModule, FiltersInputsComponent, ...sharedModule],
  templateUrl: './tipos-equipamentos.component.html',
  styleUrl: './tipos-equipamentos.component.scss'
})
export class TiposEquipamentosComponent {
  private _modalService = inject(ModalService<ModalFormCreateTipoEquipamentoComponent>);
  @ViewChild(TableTiposEquipamentosComponent) tableTiposEquipamentos!: TableTiposEquipamentosComponent;
  constructor(
  ) { }
  icon = "la la-plus-circle"

  formGroup: FormGroup = new FormGroup({
    nmTipoEquipamento: new FormControl<string>("", { nonNullable: true }),
  });

  table = viewChild<TableTiposEquipamentosComponent>(TableTiposEquipamentosComponent);

  onSearch() {
    if (!this.table()) return;
    const filters = {
      nmTipoEquipamento: this.formGroup.get('nmTipoEquipamento')?.value,
    };
    this.table().load(filters);
  }

  cadastrar() {
    this._modalService.component(ModalFormCreateTipoEquipamentoComponent).open();
  }
}
