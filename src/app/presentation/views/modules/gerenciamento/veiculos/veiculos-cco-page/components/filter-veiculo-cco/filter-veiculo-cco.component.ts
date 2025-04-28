import { sharedModule } from '@/presentation/shared/shared';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, InputComponent } from '@tivic-team/tivic-ui';
import { TableVeiculosCCOComponent } from '../table-veiculos-cco/table-veiculos-cco.component';

@Component({
  selector: 'app-filter-veiculo-cco',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ...sharedModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-veiculo-cco.component.html',
  styleUrl: './filter-veiculo-cco.component.scss'
})
export class FilterVeiculoCCOComponent {
  private _elementRef = inject(ElementRef);

  @Input() formGroup!: FormGroup;
  @Input() table?: TableVeiculosCCOComponent;

  pesquisar(): void {
    if (!this.table) {
      return;
    }
    const filters = this.formGroup.getRawValue();
    this.table.load(filters);
  }

  limpar(): void {
    this.formGroup.reset();
  }

  @HostListener("document:click", ["$event"])
  handleClick(event: Event): void {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      if (this.pesquisar) return;
    }
  }
}
