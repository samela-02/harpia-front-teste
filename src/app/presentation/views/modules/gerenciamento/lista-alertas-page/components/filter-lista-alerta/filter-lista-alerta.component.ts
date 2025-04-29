import { sharedModule } from '@/presentation/shared/shared';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, DropdownComponent, InputComponent } from '@tivic-team/tivic-ui';
import { Store } from '@ngxs/store';
import { InstituicaoSelectors } from '@/infrastructure/store/selectors/instituicao.selectors';
import { ListaAlertaSelectors } from '@/infrastructure/store/selectors/lista-alerta.selectors';
import { TableListaAlertasComponent } from '../table-lista-alerta/table-lista-alertas.component';

@Component({
  selector: 'app-filter-lista-alerta',
  standalone: true,
  imports: [DropdownComponent, ButtonComponent, ...sharedModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-lista-alerta.component.html',
  styleUrl: './filter-lista-alerta.component.scss'
})
export class FilterListaAlertaComponent {
  private _elementRef = inject(ElementRef);
  private _store = inject(Store);

  @Input() formGroup!: FormGroup;
  @Input() table?: TableListaAlertasComponent;

  public instituicoes = () => this._store.select(InstituicaoSelectors.instituicaoSelect)

  public show = signal<boolean>(false);

  get value() {
    return this.formGroup.get("idInstituicao")?.value;
  }

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
      if (this.value) return;
      this.show.set(false);
    }
  }
}
