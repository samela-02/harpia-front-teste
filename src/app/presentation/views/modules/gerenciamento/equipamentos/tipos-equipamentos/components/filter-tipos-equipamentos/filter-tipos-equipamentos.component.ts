import { sharedModule } from '@/presentation/shared/shared';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, InputComponent } from '@tivic-team/tivic-ui';
import { TableTiposEquipamentosComponent } from '../table-tipos-equipamentos/table-tipos-equipamentos.component';

@Component({
  selector: 'app-filter-tipos-equipamentos',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ...sharedModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-tipos-equipamentos.component.html',
  styleUrl: './filter-tipos-equipamentos.component.scss'
})
export class FilterTiposEquipamentosComponent implements OnInit {
  private _elementRef = inject(ElementRef);

  @Input() formGroup!: FormGroup;
  @Input() table?: TableTiposEquipamentosComponent;

  public show = signal<boolean>(false);

  ngOnInit() {
  }

  get value() {
    return this.formGroup.get("nmTipoEquipamento")?.value;
  }

  pesquisar(): void {
    if (!this.table) {
      return;
    }
    const filters = {
      nmTipoEquipamento: this.formGroup.get('nmTipoEquipamento')?.value
    };
    this.table.load(filters);
  }

  limpar(): void {
    this.formGroup.reset();
    if (this.table) {
      this.table.load();
    }
  }

  @HostListener("document:click", ["$event"])
  handleClick(event: Event): void {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      if (this.value) return;
      this.show.set(false);
    }
  }
}
