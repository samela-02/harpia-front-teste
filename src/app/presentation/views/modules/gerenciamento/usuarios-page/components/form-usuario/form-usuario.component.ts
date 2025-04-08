import { BuscarUsuariosUseCase } from '@/application/usecase/usuario/buscar-usuarios.usecase';
import { CriarUsuarioUseCase } from '@/application/usecase/usuario/criar-usuario.usecase';
import { DesativarUsuarioUseCase } from '@/application/usecase/usuario/desativar-usuario.usecase';
import { EditarUsuarioUseCase } from '@/application/usecase/usuario/editar-usuario.usecase';
import { RoleLabel, UsuarioRole } from '@/domain/enums/usuario-role.enum';
import { InstituicaoFilter, InstituicaoProps } from '@/domain/filters/instituicao/instituicao.filter';
import { UsuarioFilter, UsuarioProps } from '@/domain/filters/usuario/usuario.filter';
import { Usuario } from '@/domain/models/command/usuario';
import { BuscarInstituicoesAction } from '@/infrastructure/store/actions/instituicao.actions';
import { BuscarUsuariosAction } from '@/infrastructure/store/actions/usuario.actions';
import { InstituicaoSelectors } from '@/infrastructure/store/selectors/instituicao.selectors';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { CustomDialogService, DropdownComponent, FormType, InputComponent, InputPasswordComponent, makeDeleteCustomDialog, SnackbarService } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [
    InputComponent,
    InputPasswordComponent,
    DropdownComponent,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.scss'
})

export class FormUsuarioComponent {
  private _snackbar = inject(SnackbarService);
  private _customDialog = inject(CustomDialogService);
  private _store = inject(Store);
  protected enumRole = RoleLabel;

  public formGroup!: FormGroup<FormType<Usuario>>;
  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public isEditable = false;
  public instituicoes = () => this._store.select(InstituicaoSelectors.instituicaoSelect)

  @Output() cadastroSucesso = new EventEmitter<void>();
  @Input() usuario: any = null;

  constructor(
    private criarUsuarioUseCase: CriarUsuarioUseCase,
    private editarUsuarioUseCase: EditarUsuarioUseCase,
    private desativarUsuarioUseCase: DesativarUsuarioUseCase,
    private buscarUsuariosUseCase: BuscarUsuariosUseCase,
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      cdInstituicao: [0, [Validators.required]],
      nmUsuario: ['', [Validators.required]],
      nmLogin: ['', [Validators.required]],
      nmSenha: [null as string | null, []],
      nmConfirmacaoSenha: [null as string | null, []],
      nmEmail: ['', [Validators.required, Validators.email]],
      nmCargo: ['', [Validators.required]],
      role: [null as UsuarioRole | null, [Validators.required]],
    }, { validators: this.senhasCombinamValidator });
  }

  ngOnInit(): void {
    this.updateForm();
    this.updateFormState();
    this.updatePasswordValidators();
    this.loadInstituicoes()
  }

  private updateFormState() {
    if (this.usuario && !this.isEditable) {
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
    if (this.usuario) {
      const propsFilter: UsuarioProps = {
        page: 0,
        size: 1,
        cdUsuario: this.usuario.cdUsuario,
      };
      const filter = new UsuarioFilter(propsFilter);

      this.buscarUsuariosUseCase.execute(filter).subscribe({
        next: (response: any) => {
          if (response.data.dados[0]) {
            this.formGroup.patchValue({
              cdInstituicao: response.data.dados[0].cdInstituicao,
              nmUsuario: response.data.dados[0].nmUsuario,
              nmEmail: response.data.dados[0].nmEmail,
              role: response.data.dados[0].role,
              nmLogin: response.data.dados[0].nmLogin,
              nmCargo: response.data.dados[0].nmCargo,
              lgAtivo: response.data.dados[0].lgAtivo
            });
          }
        },
        error: () => {
          this._snackbar.error('Erro ao buscar dados do usuário');
        }
      });
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value as Usuario;
      if (this.usuario?.cdUsuario) {
        this.editarUsuario(this.usuario.cdUsuario, formData);
      } else {
        this.criarUsuario(formData);
      }
    }

  }

  private editarUsuario(cdUsuario: number, formData: Usuario) {
    formData.cdUsuario = this.usuario.cdUsuario;
    this.editarUsuarioUseCase.execute(cdUsuario, formData).subscribe({
      next: () => {
        this._snackbar.success('Usuário atualizado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableUsuário()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  criarUsuario(formData: Usuario) {
    this.criarUsuarioUseCase.execute(formData).subscribe({
      next: () => {
        this._snackbar.success('Usuário criado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableUsuário()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  desativarUsuario(usuario: Usuario) {
    this.desativarUsuarioUseCase.execute(usuario.cdUsuario).subscribe({
      next: () => {
        this._snackbar.success('Usuário desativado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableUsuário()
      },
      error: (error) => {
        this._snackbar.error(error.message)
      }
    })
  }

  confirmarDesativacaoDeUsuario(usuario: Usuario) {
    const dialog = this._customDialog.warn(makeDeleteCustomDialog({
      title: "Desativar Usuário",
      value: `o usuário ${usuario.nmUsuario.toLowerCase()}?`
    }));
    return this._customDialog.afterClosed(dialog).subscribe((confirm) => {
      if (confirm) {
        this.desativarUsuario(usuario)
        this._snackbar.success("Usuário desativado com sucesso")
        this.loadTableUsuário()
      }
    });
  }

  loadTableUsuário() {
    const paginationProps: InstituicaoProps = {
      page: 0,
    };
    const filter = new UsuarioFilter(paginationProps);
    this._store.dispatch(new BuscarUsuariosAction(filter)).subscribe(() => {
    })
  }

  loadInstituicoes(page: number = 0) {
    const paginationProps: InstituicaoProps = {
      page: page,
      size: 5000,
    };
    const filterProps = new InstituicaoFilter(paginationProps);
    this._store.dispatch(new BuscarInstituicoesAction(filterProps)).subscribe()
  }


  private updatePasswordValidators() {
    const senhaControl = this.formGroup.get('nmSenha');
    const confirmacaoSenhaControl = this.formGroup.get('nmConfirmacaoSenha');

    if (this.usuario?.cdUsuario) {
      senhaControl?.clearValidators();
      confirmacaoSenhaControl?.clearValidators();
    } else {
      senhaControl?.setValidators([Validators.required]);
      confirmacaoSenhaControl?.setValidators([Validators.required]);
    }
    senhaControl?.updateValueAndValidity();
    confirmacaoSenhaControl?.updateValueAndValidity();
  }

  private senhasCombinamValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const senha = control.get('nmSenha');
    const confirmacaoSenha = control.get('nmConfirmacaoSenha');
    if (!senha || !confirmacaoSenha && this.usuario?.cdUsuario) {
      return null;
    }
    if (senha.value || confirmacaoSenha.value) {
      return senha.value === confirmacaoSenha.value ? null : { senhasNaoCombinam: true };
    }
    return null;
  };
}
