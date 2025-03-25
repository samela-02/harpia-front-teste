import { LoginDto } from '@/domain/dto/login.dto';
import { AuthServiceImpl } from '@/infrastructure/services/auth.service-impl';
import { Component, inject } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormType } from '@tivic-team/tivic-ui';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [MatInput, MatFormField, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {
  constructor(private authService: AuthServiceImpl){}
  // private _controlContainer = inject(ControlContainer);
  formGroup: FormGroup<FormType<LoginDto>>;
  loginDto = new LoginDto()

  ngOnInit() {

    this.authService.logar(this.loginDto)
    // this.formGroup = this._controlContainer.control as FormGroup;
  }
}
