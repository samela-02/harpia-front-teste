import { sharedModule } from '@/presentation/shared/shared';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, DropdownComponent, FormType, InputComponent } from '@tivic-team/tivic-ui';
import { TableUsuariosComponent } from '../../../../usuarios-page/components/table-usuarios/table-usuarios.component';
import { EquipamentosProps } from '@/domain/filters/equipamento/equipamento.filter';
import { Store } from '@ngxs/store';
import { InstituicaoSelectors } from '@/infrastructure/store/selectors/instituicao.selectors';
import { TableEquipamentosComponent } from '../table-equipamentos/table-equipamentos.component';

@Component({
  selector: 'app-filter-equipamento',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ...sharedModule, ReactiveFormsModule, DropdownComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-equipamento.component.html',
  styleUrl: './filter-equipamento.component.scss'
})
export class FilterEquipamentoComponent {
  private _elementRef = inject(ElementRef);
  private _store = inject(Store);

  @Input() formGroup!: FormGroup;
  @Input() table?: TableEquipamentosComponent;

  public instituicoes = () => this._store.select(InstituicaoSelectors.instituicaoSelect)

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
