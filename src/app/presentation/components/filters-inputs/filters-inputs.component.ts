import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-filters-inputs',
  standalone: true,
  imports: [MatIcon, MatFormFieldModule, MatFormField, CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './filters-inputs.component.html',
  styleUrl: './filters-inputs.component.scss'
})
export class FiltersInputsComponent {
  @Input() formGroup: FormGroup;
  @Input() searchField: string = '';
  @Input() placeholder: string = 'Pesquisar';
  @Input() openFilters: boolean = true
  @Output() search = new EventEmitter<string>();

  isOpenBox = false;
  showFiltersOverlay = false;
  searchTerm: string = '';

  toggleFilters(): void {
    if (this.isOpenBox) {
      this.isOpenBox = false;
        this.showFiltersOverlay = false;
    } else {
      this.isOpenBox = true;
      this.showFiltersOverlay = true;
    }
  }

  onSearch(): void {
    if (this.searchField && this.formGroup && this.formGroup.get(this.searchField)) {
      this.formGroup.get(this.searchField).setValue(this.searchTerm);
    }
    this.search.emit(this.searchTerm);
  }

  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
