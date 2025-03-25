import { Component, OnInit } from '@angular/core';
import { ApresentacaoHarpiaComponent } from './components/apresentacao-harpia/apresentacao-harpia.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports:[ApresentacaoHarpiaComponent, FormLoginComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  ngOnInit() {
    const img = new Image();
    img.src = '../../../../../../assets/background/background.png';
    img.onload = () => {
      const pageElement = document.querySelector('.page');
      pageElement?.classList.add('loaded');
    };
  }
}
