import { BuscarComponentesUseCase } from '@/application/usecase/componente/buscar-componentes.usecase';
import { CriarComponenteUseCase } from '@/application/usecase/componente/criar-componente.usecase';
import { DesativarComponenteUseCase } from '@/application/usecase/componente/desativar-componente..usecase';
import { EditarComponenteUseCase } from '@/application/usecase/componente/editar-componente.usecase';
import { ComponentesFilter, ComponentesProps } from '@/domain/filters/componente/componente.filter';
import { EquipamentosFilter, EquipamentosProps } from '@/domain/filters/equipamento/equipamento.filter';
import { TiposComponentesFilter, TiposComponentesProps } from '@/domain/filters/tipo-componente/tipo-componente.filter';
import { Componente } from '@/domain/models/command/componentes';
import { BuscarComponentesAction } from '@/infrastructure/store/actions/componente.actions';
import { BuscarEquipamentosAction } from '@/infrastructure/store/actions/equipamento.actions';
import { BuscarTiposComponentesAction } from '@/infrastructure/store/actions/tipo-componente.actions';
import { EquipamentoSelectors } from '@/infrastructure/store/selectors/equipamento.selectors';
import { TipoComponenteSelectors } from '@/infrastructure/store/selectors/tipo-componente.selectors';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { CustomDialogService, DropdownComponent, FormType, InputComponent, makeDeleteCustomDialog, SnackbarService } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-componente',
  standalone: true,
  imports: [
    InputComponent,
    MatButtonModule,
    MatDividerModule,
    DropdownComponent,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-componentes.component.html',
  styleUrl: './form-componentes.component.scss'
})
export class FormComponenteComponent {
  private _snackbar = inject(SnackbarService);
  public formGroup!: FormGroup<FormType<Componente>>;
  private _customDialog = inject(CustomDialogService);
  private _store = inject(Store);

  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public isEditable = false;

  public equipamentos = () => this._store.select(EquipamentoSelectors.equipamentosSelect)
  public tiposComponente = () => this._store.select(TipoComponenteSelectors.tiposComponentesSelect)

  @Output() cadastroSucesso = new EventEmitter<void>();
  @Input() componentes: any = null;

  constructor(
    private criarComponenteUseCase: CriarComponenteUseCase,
    private editarComponenteUseCase: EditarComponenteUseCase,
    private desativarComponenteUseCase: DesativarComponenteUseCase,
    private formBuilder: FormBuilder,
    private buscarComponentesUseCase: BuscarComponentesUseCase,
  ) {
    this.formGroup = this.formBuilder.group({
      nmComponente: ['', [Validators.required]],
      idComponente: ['', [Validators.required]],
      cdTipoComponente: [0, [Validators.required]],
      cdEquipamento: [0, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadEquipamentos()
    this.loadTipoComponente()
    this.updateForm();
    this.updateFormState();
  }

  private updateFormState() {
    if (this.componentes && !this.isEditable) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  toggleEdit() {
    this.isEditable = !this.isEditable;
    this.updateFormState();
  }

  private updateForm() {
    if (this.componentes) {
      const propsFilter: ComponentesProps = {
        page: 0,
        size: 1,
        cdComponente: this.componentes?.cdComponente
      };
      const filter = new ComponentesFilter(propsFilter);

      this.buscarComponentesUseCase.execute(filter).subscribe({
        next: (response: any) => {
          if (response.data.dados[0]) {
            this.formGroup.patchValue({
              nmComponente: response?.data?.dados[0]?.nmComponente,
              idComponente: response?.data?.dados[0]?.idComponente,
              cdEquipamento: response?.data?.dados[0]?.cdEquipamento,
              cdTipoComponente: response?.data?.dados[0]?.cdTipoComponente
            });
          }
        },
        error: () => {
          this._snackbar.error('Erro ao buscar dados do componente');
        }
      });
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value as Componente;
      if (this.componentes?.cdComponente) {
        this.editarComponente(this.componentes.cdComponente,formData);
      } else {
        this.criarComponente(formData);
      }
    }

  }

  private editarComponente(cdComponente: number, formData: Componente) {
    formData.cdComponente = this.componentes.cdInstituicao;
    this.editarComponenteUseCase.execute(cdComponente, formData).subscribe({
      next: () => {
        this._snackbar.success('Equipamento atualizado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableComponente()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  criarComponente(formData: Componente) {
    this.criarComponenteUseCase.execute(formData).subscribe({
      next: () => {
        this._snackbar.success('Cadastro de Componente criado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableComponente()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  desativarComponente(componentes: Componente) {
    this.desativarComponenteUseCase.execute(componentes.cdComponente).subscribe({
      next: () => {
        this._snackbar.success('Desativação de Componente desativado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableComponente()
      },
      error: (error) => {
        this._snackbar.error(error.message)
      }
    })
  }

  confirmarDesativacaoDeComponente(equipamento: Componente) {
    const dialog = this._customDialog.warn(makeDeleteCustomDialog({
      title: "Desativar  de Componente",
      value:`o  de equipamento ${equipamento.nmComponente.toLowerCase()}?`
    }));
    return this._customDialog.afterClosed(dialog).subscribe((confirm) => {
      if (confirm) {
        this.desativarComponente(equipamento)
      }
    });
  }

  loadTableComponente() {
    const paginationProps: ComponentesProps = {
      page: 0,
    };
    const filter = new ComponentesFilter(paginationProps);
    this._store.dispatch(new BuscarComponentesAction(filter)).subscribe(() => {
    })
  }

  loadEquipamentos() {
    const paginationProps: EquipamentosProps = {
      page: 0,
      size: 5000
    };
    const filter = new EquipamentosFilter(paginationProps);
    this._store.dispatch(new BuscarEquipamentosAction(filter)).subscribe(() => {
    })
  }

  loadTipoComponente() {
    const paginationProps: TiposComponentesProps = {
      page: 0,
      size: 5000
    };
    const filter = new TiposComponentesFilter(paginationProps);
    this._store.dispatch(new BuscarTiposComponentesAction(filter)).subscribe(() => {
    })
  }
}
