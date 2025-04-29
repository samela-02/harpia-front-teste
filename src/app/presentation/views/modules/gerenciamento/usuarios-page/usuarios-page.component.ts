import { FiltersInputsComponent } from '@/presentation/shared/components/filters-inputs/filters-inputs.component';
import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TableUsuariosComponent } from './components/table-usuarios/table-usuarios.component';
import { FilterUsuarioComponent } from './components/filter-usuario/filter-usuario.component';
import { sharedModule } from '@/presentation/shared/shared';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalFormCreateUsuarioComponent } from './components/modal-form-create-usuario/modal-form-create-usuario.component';
import { ModalService } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [TableUsuariosComponent, MatButtonModule, FiltersInputsComponent, FilterUsuarioComponent, ...sharedModule],
  templateUrl: './usuarios-page.component.html',
  styleUrl: './usuarios-page.component.scss'
})
export class UsuariosPageComponent {
  private _modalService = inject(ModalService<ModalFormCreateUsuarioComponent>);
  @ViewChild(TableUsuariosComponent) tableUsuarios!: TableUsuariosComponent;

  icon = "la la-plus-circle"

  formGroup: FormGroup = new FormGroup({
    nmUsuario: new FormControl<string>("", { nonNullable: true }),
    role: new FormControl<string>("", { nonNullable: true }),
  });

  table = viewChild<TableUsuariosComponent>(TableUsuariosComponent);

  onSearch() {
    if (!this.table()) return;
    const filters = {
      nmUsuario: this.formGroup.get('nmUsuario')?.value,
      role: this.formGroup.get('role')?.value
    };
    this.table().load(filters);
  }

  cadastrar() {
    this._modalService.component(ModalFormCreateUsuarioComponent).open();
  }
}
