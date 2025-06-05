import { AlocarEquipamentoUseCase } from '@/application/usecase/equipamento/alocar-equipamento.usecase';
import { BuscarEquipamentosUseCase } from '@/application/usecase/equipamento/buscar-equipamentos.usecase';
import { CriarEquipamentoUseCase } from '@/application/usecase/equipamento/criar-equipamento.usecase';
import { DesalocarEquipamentoUseCase } from '@/application/usecase/equipamento/desalocar-equipamento.usecase';
import { DesativarEquipamentoUseCase } from '@/application/usecase/equipamento/desativar-equipamento..usecase';
import { EditarEquipamentoUseCase } from '@/application/usecase/equipamento/editar-tipo-equipamento.usecase';
import { BuscarDadosDeUsuarioUseCase } from '@/application/usecase/usuario/buscar-dados-de-usuario.usecase';
import { UsuarioLogadoResponse } from '@/domain/dtos/usuarioLogadoResponse.dto';
import { UsuarioRole } from '@/domain/enums/usuario-role.enum';
import { EquipamentosFilter, EquipamentosProps } from '@/domain/filters/equipamento/equipamento.filter';
import { InstituicaoFilter, InstituicaoProps } from '@/domain/filters/instituicao/instituicao.filter';
import { TipoEquipamentosFilter, TipoEquipamentosProps } from '@/domain/filters/lista-equipamento/tipo-equipamento.filter';
import { VeiculoCCOFilter, VeiculoCCOProps } from '@/domain/filters/veiculoCCO/veiculoCCO.filter';
import { Equipamento } from '@/domain/models/command/equipamento';
import { BuscarEquipamentosAction } from '@/infrastructure/store/actions/equipamento.actions';
import { BuscarInstituicoesAction } from '@/infrastructure/store/actions/instituicao.actions';
import { BuscarTiposEquipamentosAction } from '@/infrastructure/store/actions/tipo-equipamento.actions';
import { BUscarVeiculosCCOAction } from '@/infrastructure/store/actions/veiculo-cco.actions';
import { InstituicaoSelectors } from '@/infrastructure/store/selectors/instituicao.selectors';
import { TipoEquipamentoSelectors } from '@/infrastructure/store/selectors/tipo-equipamento.selectors';
import { VeiculoCCOSelectors } from '@/infrastructure/store/selectors/veiculo-cco.selectors';
import { CardDetailsComponent } from '@/presentation/shared/components/card-details/card-details.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { CustomDialogService, DropdownComponent, FormType, InputComponent, makeDeleteCustomDialog, SnackbarService } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-equipamentos',
  standalone: true,
  imports: [
    InputComponent,
    CardDetailsComponent,
    MatButtonModule,
    MatDividerModule,
    DropdownComponent,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-equipamentos.component.html',
  styleUrl: './form-equipamentos.component.scss'
})
export class FormEquipamentoComponent {
  private _snackbar = inject(SnackbarService);
  public formGroup!: FormGroup<FormType<Equipamento>>;
  public formGroupAlocacao!: FormGroup;
  private _customDialog = inject(CustomDialogService);
  private _store = inject(Store);

  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public isEditable = false;

  public instituicoes = () => this._store.select(InstituicaoSelectors.instituicaoSelect)
  public tiposEquipamento = () => this._store.select(TipoEquipamentoSelectors.tiposEquipamentosSelect)
  public veiculosCCO = () => this._store.select(VeiculoCCOSelectors.veiculosCCOSelect)
  public usuarioLogado: UsuarioLogadoResponse;
  public UsuarioRole = UsuarioRole;

  @Output() cadastroSucesso = new EventEmitter<void>();
  @Input() equipamentos: any = null;

  constructor(
      private buscarDadosDeUsuario: BuscarDadosDeUsuarioUseCase,
      private criarEquipamentoUseCase: CriarEquipamentoUseCase,
      private alocarEquipamentoUseCase: AlocarEquipamentoUseCase,
      private desalocarEquipamentoUseCase: DesalocarEquipamentoUseCase,
      private editarEquipamentoUseCase: EditarEquipamentoUseCase,
      private desativarEquipamentoUseCase: DesativarEquipamentoUseCase,
      private formBuilder: FormBuilder,
      private buscarEquipamentosUseCase: BuscarEquipamentosUseCase,
    ) {
      this.buscarDadosDeUsuario.execute().subscribe((usuario) => {
        this.usuarioLogado = usuario.data
      })
      this.formGroup = this.formBuilder.group({
        nmEquipamento: ['', [Validators.required]],
        cdInstituicao: [0, [Validators.required]],
        idEquipamento: ['', [Validators.required]],
      cdTipoEquipamento: [0, [Validators.required]],
      nrSerie: ['', [Validators.required]],
    });

    this.formGroupAlocacao = this.formBuilder.group({
      cdVeiculo: [null]
    })
  }

  ngOnInit(): void {
    this.loadInstituicoes()
    this.loadVeiculos()
    this.loadTipoEquipamento();
    this.updateForm();
    this.updateFormState();
  }

  private updateFormState() {
    if (this.equipamentos && !this.isEditable) {
      this.formGroup.disable();
      this.formGroupAlocacao.disable()
    } else {
      this.formGroup.enable();
      if (!this.equipamentos?.alocacao) {
        this.formGroupAlocacao.enable()
      }
    }
  }

  toggleEdit() {
    this.isEditable = !this.isEditable;
    this.updateFormState();
  }

  private updateForm() {
    if (this.equipamentos) {
      const propsFilter: EquipamentosProps = {
        page: 0,
        size: 1,
        cdEquipamento: this.equipamentos?.cdEquipamento
      };
      const filter = new EquipamentosFilter(propsFilter);
      this.buscarEquipamentosUseCase.execute(filter).subscribe({
        next: (response: any) => {
          if (response.data.dados[0]) {
            this.formGroup.patchValue({
              nmEquipamento: response?.data?.dados[0]?.nmEquipamento,
              idEquipamento: response?.data?.dados[0]?.idEquipamento,
              nrSerie: response?.data?.dados[0]?.nrSerie,
              cdInstituicao: response?.data?.dados[0]?.cdInstituicao,
              cdTipoEquipamento: response?.data?.dados[0]?.cdTipoEquipamento
            });
            this.formGroupAlocacao.patchValue({
              cdVeiculo: response?.data?.dados[0]?.alocacao?.veiculo?.cdVeiculo
            })
          }
        },
        error: () => {
          this._snackbar.error('Erro ao buscar dados do equipamento');
        }
      });
    }
  }


  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value as Equipamento;
      if (this.equipamentos?.cdEquipamento) {
        this.editarEquipamento(this.equipamentos.cdEquipamento, formData);
      } else {
        this.criarEquipamento(formData);
      }
    } if (this.formGroupAlocacao.valid) {
      const formData = this.formGroupAlocacao.value;
      if (!this.equipamentos.alocacao?.veiculo?.cdVeiculo && formData.cdVeiculo) {
        this.alocarEquipamento(this.equipamentos.cdEquipamento, formData.cdVeiculo)
      }
    }

  }

  private editarEquipamento(cdEquipamento: number, formData: Equipamento) {
    formData.cdEquipamento = this.equipamentos.cdInstituicao;
    this.editarEquipamentoUseCase.execute(cdEquipamento, formData).subscribe({
      next: () => {
        this._snackbar.success('Equipamento atualizado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableEquipamento()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  criarEquipamento(formData: Equipamento) {
    this.criarEquipamentoUseCase.execute(formData).subscribe({
      next: () => {
        this._snackbar.success('Equipamento criado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableEquipamento()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  alocarEquipamento(cdEquipamento: number, cdVeiculo: number) {
    this.alocarEquipamentoUseCase.execute(cdEquipamento, cdVeiculo).subscribe({
      next: () => {
        this.formGroupAlocacao.reset();
        this.formGroupAlocacao.disable();
        this.loadTableEquipamento()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    })
  }

  desalocarEquipamento(cdEquipamento: number) {
    const dialog = this._customDialog.warn(({
      title: "Desalocar Equipamento do Veículo",
      message: "Você deseja desalocar veículo deste equipamento?",
      confirmLabel: "Sim",
      cancelLabel: "Cancelar",
      icon: {
        name: "taxi_alert",
        size: 'normal'
      }
    }));
    return this._customDialog.afterClosed(dialog).subscribe((confirm) => {
      if (confirm) {
        this.desalocarEquipamentoUseCase.execute(cdEquipamento).subscribe(({
          next: () => {
            this._snackbar.success('Veículo desalocado com sucesso!');
            this.loadTableEquipamento()
            this.cadastroSucesso.emit()
          },
          error: (error) => {
            this._snackbar.error(error.message)
          }
        }))
      }
    });
  }

  desativarEquipamento(equipamentos: Equipamento) {
    this.desativarEquipamentoUseCase.execute(equipamentos.cdEquipamento).subscribe({
      next: () => {
        this._snackbar.success('Equipamento desativado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableEquipamento()
      },
      error: (error) => {
        this._snackbar.error(error.message)
      }
    })
  }

  confirmarDesativacaoDeEquipamento(equipamento: Equipamento) {
    const dialog = this._customDialog.warn(makeDeleteCustomDialog({
      title: "Desativar Equipamento",
      value: `o equipamento ${equipamento.nmEquipamento.toLowerCase()}?`
    }));
    return this._customDialog.afterClosed(dialog).subscribe((confirm) => {
      if (confirm) {
        this.desativarEquipamento(equipamento)
      }
    });
  }

  loadTableEquipamento() {
    const paginationProps: EquipamentosProps = {
      page: 0,
      size: 10
    };
    const filter = new EquipamentosFilter(paginationProps);
    this._store.dispatch(new BuscarEquipamentosAction(filter)).subscribe(() => {
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

  loadTipoEquipamento() {
    const paginationProps: TipoEquipamentosProps = {
      page: 0,
      size: 5000
    };
    const filter = new TipoEquipamentosFilter(paginationProps);
    this._store.dispatch(new BuscarTiposEquipamentosAction(filter)).subscribe(() => {
    })
  }

  loadVeiculos() {
    const veiculoProps: VeiculoCCOProps = {
      page: 0,
      size: 5000,
      lgAtivo: 1
    }
    const filter = new VeiculoCCOFilter(veiculoProps);
    this._store.dispatch(new BUscarVeiculosCCOAction(filter)).subscribe()
  }
}
