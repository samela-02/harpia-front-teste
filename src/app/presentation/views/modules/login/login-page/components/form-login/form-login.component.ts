import { LoginDto } from '@/domain/dto/login.dto';
import { AuthServiceImpl } from '@/infrastructure/services/auth.service-impl';
import { Component, inject } from '@angular/core';
import { ControlContainer, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormType } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    MatInput,
    MatFormField,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {
  formGroup: FormGroup;

  constructor(
    private authService: AuthServiceImpl,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      nmLogin: [''],
      nmSenha: ['']
    });
  }

  onSubmit() {
    console.log("teste")
    if (this.formGroup.valid) {
      const loginData = this.formGroup.value;
      this.authService.logar(loginData);
    }
  }
}
