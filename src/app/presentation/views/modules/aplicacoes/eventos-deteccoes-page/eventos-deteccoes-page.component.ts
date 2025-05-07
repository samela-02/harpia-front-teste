import { FiltersInputsComponent } from '@/presentation/shared/components/filters-inputs/filters-inputs.component';
import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { TableDeteccoesComponent } from "./components/table-deteccoes/table-deteccoes.component";
import { InputSearchComponent } from '@tivic-team/tivic-ui';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-eventos-deteccoes-page',
  standalone: true,
  imports: [FiltersInputsComponent, TableDeteccoesComponent, InputSearchComponent, CommonModule],
  templateUrl: './eventos-deteccoes-page.component.html',
  styleUrl: './eventos-deteccoes-page.component.scss'
})
export class EventosDeteccoesPageComponent {
  private _formBuilder = inject(FormBuilder);
  table = viewChild<TableDeteccoesComponent>(TableDeteccoesComponent);

  formGroup: FormGroup = this._formBuilder.group({
    nrPlaca: ['']
  })

  onSearch() {
    if (!this.table()) return;
    const filters = this.formGroup.getRawValue()
    this.table().load(filters);
  }
}
