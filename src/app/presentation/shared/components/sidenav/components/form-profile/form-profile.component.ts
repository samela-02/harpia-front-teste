import { BuscarUsuariosUseCase } from '@/application/usecase/usuario/buscar-usuarios.usecase';
import { EditarUsuarioUseCase } from '@/application/usecase/usuario/editar-usuario.usecase';
import { RoleLabel, UsuarioRole } from '@/domain/enums/usuario-role.enum';
import { InstituicaoFilter, InstituicaoProps } from '@/domain/filters/instituicao/instituicao.filter';
import { UsuarioFilter, UsuarioProps } from '@/domain/filters/usuario/usuario.filter';
import { Usuario } from '@/domain/models/command/usuario';
import { BuscarInstituicoesAction } from '@/infrastructure/store/actions/instituicao.actions';
import { InstituicaoSelectors } from '@/infrastructure/store/selectors/instituicao.selectors';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { CustomDialogService, DropdownComponent, FormType, InputComponent, InputPasswordComponent, SnackbarService } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-profile',
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
  templateUrl: './form-profile.component.html',
  styleUrl: './form-profile.component.scss'
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
    private editarUsuarioUseCase: EditarUsuarioUseCase,
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
      nmCargo: [''],
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
      this.formGroup.get('nmUsuario').enable();
      this.formGroup.get('nmEmail').enable();
      this.formGroup.get('nmLogin').enable();
      this.formGroup.get('nmSenha').enable();
      this.formGroup.get('nmConfirmacaoSenha').enable();
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
        cdUsuario: this.usuario,
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
      this.formGroup.enable()
      const formData = this.formGroup.value as Usuario;
        this.editarUsuario(this.usuario, formData);
  }

  private editarUsuario(cdUsuario: number, formData: Usuario) {
    formData.cdUsuario = this.usuario;
    this.editarUsuarioUseCase.execute(cdUsuario, formData).subscribe({
      next: () => {
        this._snackbar.success('Usuário atualizado com sucesso!');
        this.cadastroSucesso.emit();
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
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

    if (this.usuario) {
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
    if (!senha || !confirmacaoSenha && this.usuario) {
      return null;
    }
    if (senha.value || confirmacaoSenha.value) {
      return senha.value === confirmacaoSenha.value ? null : { senhasNaoCombinam: true };
    }
    return null;
  };
}
