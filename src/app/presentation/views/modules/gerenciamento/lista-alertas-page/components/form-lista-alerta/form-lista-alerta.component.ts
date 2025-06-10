import { CriarListaAlertaUseCase } from '@/application/usecase/lista-alerta/criar-lista-alerta.usecase';
import { DesativarListaAlertaUseCase } from '@/application/usecase/lista-alerta/desativar-lista-alerta.usecase';
import { EditarListaAlertaUseCase } from '@/application/usecase/lista-alerta/editar-lista-alerta.usecase';
import { UsuarioRole } from '@/domain/enums/usuario-role.enum';
import { InstituicaoFilter, InstituicaoProps } from '@/domain/filters/instituicao/instituicao.filter';
import { ListaAlertaFilter, ListaAlertaProps } from '@/domain/filters/lista-alerta/lista-alerta.filter';
import { ListaAlerta } from '@/domain/models/command/lista-alerta';
import { ListaAlertaAcessoQueryResponse } from '@/domain/models/query/lista-alerta-acesso-query-response';
import { HasRoleDirective } from '@/infrastructure/directives/has-role.directive';
import { VerifyInstitutionDirective } from '@/infrastructure/directives/verify-institution.directive';
import { AuthServiceImpl } from '@/infrastructure/services/auth.service-impl';
import { BuscarInstituicoesAction } from '@/infrastructure/store/actions/instituicao.actions';
import { BuscarListaAlertaAction } from '@/infrastructure/store/actions/lista-alerta.actions';
import { InstituicaoSelectors } from '@/infrastructure/store/selectors/instituicao.selectors';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
    HasRoleDirective,
    VerifyInstitutionDirective,
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
  private _customDialog = inject(CustomDialogService);
  private _store = inject(Store);

  private usuarioRole = this.authService.getRole();
  private usuarioIdInstituicao = this.authService.getIdInstituicaoUser();

  public formGroup!: FormGroup<FormType<ListaAlerta>>;
  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public isEditable = false;
  public instituicoes = () => this._store.select(InstituicaoSelectors.instituicaoSelect)
  public roles = UsuarioRole;
  public instituicoesPermitidasEditar: string[] = [];

  @Output() cadastroSucesso = new EventEmitter<void>();
  @Input() listaAlerta: any = null;

  constructor(
    private authService: AuthServiceImpl,
    private criarListaAlertaUseCase: CriarListaAlertaUseCase,
    private editarListaAlertaUseCase: EditarListaAlertaUseCase,
    private desativarListaAlertaUseCase: DesativarListaAlertaUseCase,
    private formBuilder: FormBuilder,
  ) {
    this.inicializaForm();
    this.aplicarRegraPorTipoDeUsuario();
  }

  private inicializaForm() {
    this.formGroup = this.formBuilder.group({
      nmListaAlerta: ['', [Validators.required]],
      dsListaAlerta: ['', [Validators.required]],
      idInstituicao: ['', [Validators.required]]
    });
    this.aplicarRegraPorTipoDeUsuario();
    this.setarInstituicoesPermitidas();
  }

  private aplicarRegraPorTipoDeUsuario() {
    if (this.usuarioRole == this.roles.ADMINISTRADOR) {
      this.loadInstituicoes();
    } else {
      this.formGroup.patchValue({
        idInstituicao: this.usuarioIdInstituicao
      });
    }
  }

  private setarInstituicoesPermitidas() {
    this.instituicoesPermitidasEditar = this.listaAlerta?.instituicoesComAcesso
      ?.filter((inst: ListaAlertaAcessoQueryResponse) => inst.owner)
      .map((inst: ListaAlertaAcessoQueryResponse) => inst.idInstituicao) || [];
  }

  ngOnInit(): void {
    this.updateForm();
    this.updateFormState();
    this.setarInstituicoesPermitidas()
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
    if (this.listaAlerta) {
      this.formGroup.patchValue({
        nmListaAlerta: this.listaAlerta.nmListaAlerta,
        dsListaAlerta: this.listaAlerta.dsListaAlerta,
        idInstituicao: this.listaAlerta.idInstituicao
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
