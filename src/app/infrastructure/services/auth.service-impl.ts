import { ResponseData } from "@/application/dtos/response-data.dto";
import { BuscarDadosDeUsuarioUseCase } from "@/application/usecase/usuario/buscar-dados-de-usuario.usecase";
import { LogarUsuarioUseCase } from "@/application/usecase/login/logar-usuario.usecase";
import { AuthDTO } from "@/domain/dtos/auth.dto";
import { LoginDto } from "@/domain/dtos/login.dto";
import { AuthService } from "@/domain/interfaces/auth-service.interface";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { DeslogarUsuarioUseCase } from "@/application/usecase/login/deslogar-usuario.usecase";
import { UsuarioLogadoResponse } from "@/domain/dtos/usuarioLogadoResponse.dto";

@Injectable({
  providedIn: "root"
})
export class AuthServiceImpl implements AuthService {

  constructor(private logarUsuarioUseCase: LogarUsuarioUseCase, private buscarDadosDeUsuario: BuscarDadosDeUsuarioUseCase, private  deslogarUsuarioUseCase: DeslogarUsuarioUseCase) { }
  private _router = inject(Router);

  async logar(login: LoginDto): Promise<ResponseData<AuthDTO>> {
    return new Promise((resolve, reject) => {
      this.logarUsuarioUseCase.execute(login).subscribe({
        next: (auth: ResponseData<AuthDTO>) => {
          if (auth) {
            this.setLocalStorage(auth)
            this._router.navigate(["/aplicacoes/inicio"]);
            resolve(auth);
            this.getDataUser()
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

  public getDataUser() {
    this.buscarDadosDeUsuario.execute().subscribe((response => {
      this.setDataUserLocalStorage(response)
    }))
  }

  public setDataUserLocalStorage(usuario: ResponseData<UsuarioLogadoResponse>){
    localStorage.setItem("nmUsuario", usuario.data.nmUsuario);
  }

  public getNomeUsuario() {
    return localStorage.getItem('nmUsuario');
  }

  public deslogar(): void {
    this.deslogarUsuarioUseCase.execute().subscribe({
      next: () => {
        localStorage.removeItem('accessToken');
        this._router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao deslogar:', error);
        localStorage.removeItem('accessToken');
        this._router.navigate(['/login']);
      }
    });
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }

  public getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

}
