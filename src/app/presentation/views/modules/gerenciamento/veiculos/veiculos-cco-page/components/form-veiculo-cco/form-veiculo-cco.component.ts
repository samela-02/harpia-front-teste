import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { CustomDialogService, FormType, InputComponent, makeDeleteCustomDialog, SnackbarService, TextareaComponent, DropdownComponent } from '@tivic-team/tivic-ui';
import { CidadeProps } from '@/domain/filters/cidade/cidade.props';
import { CidadeFilter } from '@/domain/filters/cidade/cidade.filter';
import { FindCidadesAction } from '@/infrastructure/store/actions/cidade.actions';
import { CidadeSelectors } from '@/infrastructure/store/selectors/cidade.selector';
import { optionsCoresVeiculos } from '@/domain/enums/cores-veiculo.enum';
import { VeiculoCCO } from '@/domain/models/command/veiculo-cco';
import { CriarVeiculoCCOUseCase } from '@/application/usecase/veiculo-cco/criar-veiculo-cco.usecase';
import { EditarVeiculoCCOUseCase } from '@/application/usecase/veiculo-cco/editar-veiculo-cco.usecase';
import { DesativarVeiculoCCOUseCase } from '@/application/usecase/veiculo-cco/desativar-veiculo-cco..usecase';
import { BuscarVeiculosCCOUseCase } from '@/application/usecase/veiculo-cco/buscar-veiculos-cco.usecase';
import { CoresVeiculosEnum } from '@/domain/enums/cores-veiculo.enum';
import { VeiculoCCOFilter, VeiculoCCOProps } from '@/domain/filters/veiculoCCO/veiculoCCO.filter';
import { BUscarVeiculosCCOAction } from '@/infrastructure/store/actions/veiculo-cco.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-veiculo-cco',
  standalone: true,
  imports: [
    InputComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
    ],
  templateUrl: './form-veiculo-cco.component.html',
  styleUrl: './form-veiculo-cco.component.scss'
})
export class FormVeiculoCCOComponent {
  private _snackbar = inject(SnackbarService);
  private _customDialog = inject(CustomDialogService);
  private _store = inject(Store);
  public formGroup!: FormGroup<FormType<VeiculoCCO>>;
  public icon = 'la la-save'
  public iconClose = 'la la-times-circle'
  public isEditable = false;
  public optionsCoresVeiculos = optionsCoresVeiculos

  @Output() cadastroSucesso = new EventEmitter<void>();
  @Input() veiculo: any = null;

  constructor(
    private criarVeiculoCCOUseCase: CriarVeiculoCCOUseCase,
    private editarVeiculoCCOUseCase: EditarVeiculoCCOUseCase,
    private desativarVeiculoCCOUseCase: DesativarVeiculoCCOUseCase,
    private formBuilder: FormBuilder,
    private buscarVeiculosCCOUseCase: BuscarVeiculosCCOUseCase,
  ) {
    this.formGroup = this.formBuilder.group({
      idVeiculo: ['', [Validators.required]],
      nrPlaca: ['', [Validators.required]],
      nmMarca: ['', [Validators.required]],
      nmModelo: ['', [Validators.required]],
      corVeiculo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.updateForm();
    this.updateFormState();
    this.loadTableVeiculoCCO()
  }

  private updateFormState() {
    if (this.veiculo && !this.isEditable) {
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
    if (this.veiculo) {
      const propsFilter: VeiculoCCOProps = {
        page: 0,
        size: 1,
        cdVeiculo: this.veiculo.cdVeiculoCCO
      };
      const filter = new VeiculoCCOFilter(propsFilter);

      this.buscarVeiculosCCOUseCase.execute(filter).subscribe({
        next: (response: any) => {
          if (response.data) {
            this.formGroup.patchValue({
              idVeiculo: response.data.dados[0].idVeiculo,
              nrPlaca: response.data.dados[0].nrPlaca,
              nmMarca: response.data.dados[0].nmMarca,
              nmModelo: response.data.dados[0].nmModelo,
              corVeiculo: response.data.dados[0].corVeiculo
            });
          }
        },
        error: () => {
          this._snackbar.error('Erro ao buscar dados do veículo');
        }
      });
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value as VeiculoCCO;
      if (this.veiculo?.cdVeiculo) {
        this.editarVeiculoCCO(this.veiculo.cdVeiculo,formData);
      } else {
        this.criarVeiculoCCO(formData);
      }
    }

  }

  private editarVeiculoCCO(cdVeiculoCCO: number, formData: VeiculoCCO) {
    formData.cdVeiculo = this.veiculo.cdVeiculoCCO;
    this.editarVeiculoCCOUseCase.execute(cdVeiculoCCO, formData).subscribe({
      next: () => {
        this._snackbar.success('Veículo atualizado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableVeiculoCCO()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  criarVeiculoCCO(formData: VeiculoCCO) {
    this.criarVeiculoCCOUseCase.execute(formData).subscribe({
      next: () => {
        this._snackbar.success('Veículo criado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableVeiculoCCO()
      },
      error: (error) => {
        this._snackbar.error(error.message);
      }
    });
  }

  desativarVeiculoCCO(veiculo: VeiculoCCO) {
    this.desativarVeiculoCCOUseCase.execute(veiculo.cdVeiculo).subscribe({
      next: () => {
        this._snackbar.success('Veículo desativado com sucesso!');
        this.cadastroSucesso.emit();
        this.loadTableVeiculoCCO()
      },
      error: (error) => {
        this._snackbar.error(error.message)
      }
    })
  }

  confirmarDesativacaoDeVeiculoCCO(veiculo: VeiculoCCO) {
    const dialog = this._customDialog.warn(makeDeleteCustomDialog({
      title: "Desativar Veículo",
      value:`a instituição ${veiculo.nmModelo.toLowerCase()}?`
    }));
    return this._customDialog.afterClosed(dialog).subscribe((confirm) => {
      if (confirm) {
        this.desativarVeiculoCCO(veiculo)
        this._snackbar.success("Veículo desativada com sucesso")
        this.loadTableVeiculoCCO()
      }
    });
  }

  loadTableVeiculoCCO() {
    const paginationProps: VeiculoCCOProps = {
      page: 0,
    };
    const filter = new VeiculoCCOFilter(paginationProps);
    this._store.dispatch(new BUscarVeiculosCCOAction(filter)).subscribe(() => {
    })
  }
}