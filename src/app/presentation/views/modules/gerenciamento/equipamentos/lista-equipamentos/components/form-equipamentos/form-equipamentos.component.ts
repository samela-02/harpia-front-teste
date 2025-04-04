import { BuscarEquipamentosUseCase } from '@/application/usecase/equipamento/buscar-equipamentos.usecase';
import { CriarEquipamentoUseCase } from '@/application/usecase/equipamento/criar-equipamento.usecase';
import { DesativarEquipamentoUseCase } from '@/application/usecase/equipamento/desativar-equipamento..usecase';
import { EditarEquipamentoUseCase } from '@/application/usecase/equipamento/editar-tipo-equipamento.usecase';
import { EquipamentosFilter, EquipamentosProps } from '@/domain/filters/equipamento/equipamento.filter';
import { InstituicaoFilter, InstituicaoProps } from '@/domain/filters/instituicao/instituicao.filter';
import { TipoEquipamentosFilter, TipoEquipamentosProps } from '@/domain/filters/lista-equipamento/tipo-equipamento.filter';
import { Equipamento } from '@/domain/models/command/equipamento';
import { BuscarEquipamentosAction } from '@/infrastructure/store/actions/equipamento.actions';
import { BuscarInstituicoesAction } from '@/infrastructure/store/actions/instituicao.actions';
import { BuscarTiposEquipamentosAction } from '@/infrastructure/store/actions/tipo-equipamento.actions';
import { InstituicaoSelectors } from '@/infrastructure/store/selectors/instituicao.selectors';
import { TipoEquipamentoSelectors } from '@/infrastructure/store/selectors/tipo-equipamento.selectors';
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
  private _customDialog = inject(CustomDialogService);
  private _store = inject(Store);

  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public isEditable = false;

  public instituicoes = () => this._store.select(InstituicaoSelectors.instituicaoSelect)
  public tiposEquipamento = () => this._store.select(TipoEquipamentoSelectors.tiposEquipamentosSelect)

  @Output() cadastroSucesso = new EventEmitter<void>();
  @Input() equipamentos: any = null;

  constructor(
    private criarEquipamentoUseCase: CriarEquipamentoUseCase,
    private editarEquipamentoUseCase: EditarEquipamentoUseCase,
    private desativarEquipamentoUseCase: DesativarEquipamentoUseCase,
    private formBuilder: FormBuilder,
    private buscarEquipamentosUseCase: BuscarEquipamentosUseCase,
  ) {
    this.formGroup = this.formBuilder.group({
      nmEquipamento: ['', [Validators.required]],
      cdInstituicao: [0, [Validators.required]],
      idEquipamento: ['', [Validators.required]],
      cdTipoEquipamento: [0, [Validators.required]],
      nrSerie: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadInstituicoes()
    this.updateForm();
    this.updateFormState();
  }

  private updateFormState() {
    if (this.equipamentos && !this.isEditable) {
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
    if (this.equipamentos) {
      const propsFilter: EquipamentosProps = {
        page: 0,
        size: 1,
        cdEquipamento: this.equipamentos?.cdEquipamento
      };
      const filter = new EquipamentosFilter(propsFilter);
      console.log(filter)

      this.buscarEquipamentosUseCase.execute(filter).subscribe({
        next: (response: any) => {
          console.log('testet',response)
          if (response.data.dados[0]) {
            this.formGroup.patchValue({
              nmEquipamento: response?.data?.dados[0]?.nmEquipamento,
              idEquipamento: response?.data?.dados[0]?.idEquipamento,
              nrSerie: response?.data?.dados[0]?.nrSerie,
              cdInstituicao: response?.data?.dados[0]?.cdInstituicao,
              cdTipoEquipamento: response?.data?.dados[0]?.cdTipoEquipamento
            });
          }
        },
        error: (error) => {
          console.error('Error fetching institution:', error);
          this._snackbar.error('Erro ao buscar dados do equipamento');
        }
      });
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value as Equipamento;
      if (this.equipamentos?.cdEquipamento) {
        this.editarEquipamento(this.equipamentos.cdEquipamento,formData);
      } else {
        this.criarEquipamento(formData);
      }
    }

  }

  private editarEquipamento(cdEquipamento: number, formData: Equipamento) {
    formData.cdEquipamento = this.equipamentos.cdInstituicao;
    this.editarEquipamentoUseCase.execute(cdEquipamento, formData).subscribe({
      next: () => {
        this._snackbar.success(' de equipamento atualizado com sucesso!');
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
        this._snackbar.success(' de Equipamento criado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableEquipamento()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  desativarEquipamento(equipamentos: Equipamento) {
    this.desativarEquipamentoUseCase.execute(equipamentos.cdEquipamento).subscribe({
      next: () => {
        this._snackbar.success(' de Equipamento desativado com sucesso!');
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
      title: "Desativar  de Equipamento",
      value:`o  de equipamento ${equipamento.nmEquipamento.toLowerCase()}?`
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


}
