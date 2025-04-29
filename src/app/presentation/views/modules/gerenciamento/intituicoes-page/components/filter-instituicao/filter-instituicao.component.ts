import { sharedModule } from '@/presentation/shared/shared';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, InputComponent } from '@tivic-team/tivic-ui';
import { TableInstituicoesComponent } from '../table-instituicoes/table-instituicoes.component';

@Component({
  selector: 'app-filter-instituicao',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ...sharedModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-instituicao.component.html',
  styleUrl: './filter-instituicao.component.scss'
})
export class FilterInstituicaoComponent {
  private _elementRef = inject(ElementRef);

  @Input() formGroup!: FormGroup;
  @Input() table?: TableInstituicoesComponent;

  public show = signal<boolean>(false);

  get value() {
    return this.formGroup.get("idInstituicao")?.value;
  }

  pesquisar(): void {
    if (!this.table) {
      return;
    }
    const filters = {
      idInstituicao: this.formGroup.get('idInstituicao')?.value
    };
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
