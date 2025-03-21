import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-input-pesquisa-filtragem',
  standalone: true,
  imports: [MatIcon, MatFormFieldModule, MatFormField, CommonModule, FormsModule, MatInputModule],
  templateUrl: './input-pesquisa-filtragem.component.html',
  styleUrl: './input-pesquisa-filtragem.component.scss'
})
export class InputPesquisaFiltragemComponent {
  isSearchExpanded = false;

  toggleSearch() {
    console.log( 'teste')
    this.isSearchExpanded = !this.isSearchExpanded;
    if (this.isSearchExpanded) {
      setTimeout(() => {
        const input = document.querySelector(".search-input") as HTMLElement;
        input?.focus();
      }, 300);
    }
  }

}
