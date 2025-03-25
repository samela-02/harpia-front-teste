import { ResponseData } from "@/application/dtos/response-data.dto";
import { BuscarDadosDeUsuarioUseCase } from "@/application/usecase/buscar-dados-de-usuario.usecase";
import { LogarUsuarioUseCase } from "@/application/usecase/logar-usuario.usecase";
import { AuthDTO } from "@/domain/dto/auth.dto";
import { LoginDto } from "@/domain/dto/login.dto";
import { AuthService } from "@/domain/interface/auth-service.interface";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthServiceImpl implements AuthService {

  constructor(private logarUsuarioUseCase: LogarUsuarioUseCase, private buscarDadosDeUsuario: BuscarDadosDeUsuarioUseCase) { }
  private _router = inject(Router);

  async logar(login: LoginDto): Promise<ResponseData<AuthDTO>> {
    return new Promise((resolve, reject) => {
      this.logarUsuarioUseCase.execute(login).subscribe({
        next: (auth: ResponseData<AuthDTO>) => {
          if (auth) {
            this.setLocalStorage(auth)
            this._router.navigate(["/aplicacoes/inicio"]);
            resolve(auth);
            this.buscarDadosDeUsuario.execute().subscribe((response => {
              console.log(response)
            }))
          } else {
            this._router.navigate(["/login"]);
            reject('Authentication failed');
          }
        },
        error: (error) => {
          this._router.navigate(["/login"]);
          reject(error);
        }
      });
    });
  }

  public setLocalStorage(auth: ResponseData<AuthDTO>) {
    localStorage.setItem("accessToken", auth.data.accessToken);
    localStorage.setItem("expiresIn", auth.data.expiresIn.toString());
  }

  public deslogar(): void {
    localStorage.removeItem('accessToken');
    this._router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }

  public getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

}
