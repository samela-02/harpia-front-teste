import { sharedModule } from '@/presentation/shared/shared';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, DropdownComponent, InputComponent } from '@tivic-team/tivic-ui';
import { TableUsuariosComponent } from '../table-usuarios/table-usuarios.component';
import { RoleLabel } from '@/domain/enums/usuario-role.enum';

@Component({
  selector: 'app-filter-usuario',
  standalone: true,
  imports: [ ButtonComponent, ...sharedModule, ReactiveFormsModule, DropdownComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-usuario.component.html',
  styleUrl: './filter-usuario.component.scss'
})
export class FilterUsuarioComponent implements OnInit {
  private _elementRef = inject(ElementRef);

  @Input() formGroup!: FormGroup;
  @Input() table?: TableUsuariosComponent;

  protected enumRole = RoleLabel;
  public show = signal<boolean>(false);

  ngOnInit() {
  }

  get value() {
    return this.formGroup.get("role")?.value;
  }

  pesquisar(): void {
    if (!this.table) {
      return;
    }
    const filters = {
      role: this.formGroup.get('role')?.value
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
