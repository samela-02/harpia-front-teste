import { BuscarInstituicoesUseCase } from '@/application/usecase/instituicao/buscar-instituicoes.usecase';
import { BuscarListaAlertaUseCase } from '@/application/usecase/lista-alerta/buscar-lista-alertas.usecase';
import { CriarListaAlertaUseCase } from '@/application/usecase/lista-alerta/criar-lista-alerta.usecase';
import { DesativarListaAlertaUseCase } from '@/application/usecase/lista-alerta/desativar-lista-alerta.usecase';
import { EditarListaAlertaUseCase } from '@/application/usecase/lista-alerta/editar-lista-alerta.usecase';
import { InstituicaoFilter, InstituicaoProps } from '@/domain/filters/instituicao/instituicao.filter';
import { ListaAlertaFilter, ListaAlertaProps } from '@/domain/filters/lista-alerta/lista-alerta.filter';
import { ListaAlerta } from '@/domain/models/command/lista-alerta';
import { BuscarInstituicoesAction } from '@/infrastructure/store/actions/instituicao.actions';
import { BuscarListaAlertaAction } from '@/infrastructure/store/actions/lista-alerta.actions';
import { InstituicaoSelectors } from '@/infrastructure/store/selectors/instituicao.selectors';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { CustomDialogService, DropdownComponent, FormType, InputComponent, makeDeleteCustomDialog, SnackbarService, TextareaComponent } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-lista-alerta',
  standalone: true,
  imports: [
    TextareaComponent,
    MatButtonModule,
    InputComponent,
    DropdownComponent,
    MatDividerModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-lista-alerta.component.html',
  styleUrl: './form-lista-alerta.component.scss'
})
export class FormListaAlertaComponent {
  private _snackbar = inject(SnackbarService);
  public formGroup!: FormGroup<FormType<ListaAlerta>>;
  private _customDialog = inject(CustomDialogService);
  private _store = inject(Store);
  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public isEditable = false;
  public instituicoes = () => this._store.select(InstituicaoSelectors.instituicaoSelect)

  @Output() cadastroSucesso = new EventEmitter<void>();
  @Input() listaAlerta: any = null;

  constructor(
    private criarListaAlertaUseCase: CriarListaAlertaUseCase,
    private editarListaAlertaUseCase: EditarListaAlertaUseCase,
    private desativarListaAlertaUseCase: DesativarListaAlertaUseCase,
    private formBuilder: FormBuilder,
    private buscarListaAlertaUseCase: BuscarListaAlertaUseCase,
  ) {
    this.formGroup = this.formBuilder.group({
      nmListaAlerta: ['', [Validators.required]],
      dsListaAlerta: ['', [Validators.required]],
      idInstituicao: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.updateForm();
    this.updateFormState();
    this.loadInstituicoes()
  }

  private updateFormState() {
    if (this.listaAlerta && !this.isEditable) {
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
    console.log(this.listaAlerta)
    if (this.listaAlerta) {
      const propsFilter: ListaAlertaProps = {
        page: 0,
        size: 1,
        idInstituicao: this.listaAlerta.idInstituicao
      };
      const filter = new ListaAlertaFilter(propsFilter);

      this.buscarListaAlertaUseCase.execute(filter).subscribe({
        next: (response: any) => {
          if (response.data.dados[0]) {
            this.formGroup.patchValue({
              nmListaAlerta: response.data.dados[0].nmListaAlerta,
              dsListaAlerta: response.data.dados[0].dsListaAlerta,
              idInstituicao: response.data.dados[0].idInstituicao
            });
          }
        },
        error: () => {
          this._snackbar.error('Erro ao buscar dados da lista de alertas');
        }
      });
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value as ListaAlerta;
      if (this.listaAlerta?.cdListaAlerta) {
        this.editarListaAlerta(this.listaAlerta.cdListaAlerta,formData);
      } else {
        this.criarListaAlerta(formData);
      }
    }

  }

  private editarListaAlerta(cdListaAlerta: number, formData: ListaAlerta) {
    formData.cdListaAlerta = this.listaAlerta.cdListaAlerta;
    this.editarListaAlertaUseCase.execute(cdListaAlerta, formData).subscribe({
      next: () => {
        this._snackbar.success('Lista de alerta atualizada com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableListaAlerta()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  criarListaAlerta(formData: ListaAlerta) {
    this.criarListaAlertaUseCase.execute(formData).subscribe({
      next: () => {
        this._snackbar.success('Lista de alerta criada com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableListaAlerta()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  desativarListaAlerta(listaAlerta: ListaAlerta) {
    this.desativarListaAlertaUseCase.execute(listaAlerta.cdListaAlerta).subscribe({
      next: () => {
        this._snackbar.success('Lista de alerta desativada com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableListaAlerta()
      },
      error: (error) => {
        this._snackbar.error(error.message)
      }
    })
  }

  confirmarDesativacaoDeListaAlerta(listaAlerta: ListaAlerta) {
    const dialog = this._customDialog.warn(makeDeleteCustomDialog({
      title: "Desativar Lista de alerta",
      value:`a instituição ${listaAlerta.nmListaAlerta.toLowerCase()}?`
    }));
    return this._customDialog.afterClosed(dialog).subscribe((confirm) => {
      if (confirm) {
        this.desativarListaAlerta(listaAlerta)
        this._snackbar.success("Lista de alerta desativada com sucesso")
        this.loadTableListaAlerta()
      }
    });
  }

  loadTableListaAlerta() {
    const paginationProps: ListaAlertaProps = {
      page: 0,
    };
    const filter = new ListaAlertaFilter(paginationProps);
    this._store.dispatch(new BuscarListaAlertaAction(filter)).subscribe(() => {
    })
  }

  loadInstituicoes() {
    const paginationProps: InstituicaoProps = {
      page: 0,
      size: 5000
    };
    const filter = new InstituicaoFilter(paginationProps);
    this._store.dispatch(new BuscarInstituicoesAction(filter)).subscribe(() => {
    })
  }

}
