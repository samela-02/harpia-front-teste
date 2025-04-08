import { EquipamentoSelectors } from '@/infrastructure/store/selectors/equipamento.selectors';
import { sharedModule } from '@/presentation/shared/shared';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ButtonComponent, DropdownComponent, InputComponent } from '@tivic-team/tivic-ui';
import { TipoComponenteSelectors } from '@/infrastructure/store/selectors/tipo-componente.selectors';
import { TableComponentesComponent } from '../table-componentes/table-componentes.component';

@Component({
  selector: 'app-filter-componente',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ...sharedModule, ReactiveFormsModule, DropdownComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-componente.component.html',
  styleUrl: './filter-componente.component.scss'
})
export class FilterComponenteComponent {
  private _elementRef = inject(ElementRef);
  private _store = inject(Store);

  @Input() formGroup!: FormGroup;
  @Input() table?: TableComponentesComponent;

  public equipamentos = () => this._store.select(EquipamentoSelectors.equipamentosSelect)

  public tiposComponentes = () => this._store.select(TipoComponenteSelectors.tiposComponentesSelect)

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
