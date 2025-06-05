import { LoginDto } from '@/domain/dtos/login.dto';
import { AuthServiceImpl } from '@/infrastructure/services/auth.service-impl';
import { Component, HostListener} from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormType } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    MatInput,
    MatDivider,
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
  @HostListener("document: keydown.enter", ["$event"]) onKeyEnter(event: KeyboardEvent) {
    event.preventDefault();
    this.onSubmit();
  }

  formGroup: FormGroup;

  constructor(
    private authService: AuthServiceImpl,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      nmLogin: ['', [Validators.required]],
      nmSenha: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const loginData = this.formGroup.value;
      this.authService.logar(loginData);
    }
  }
}
