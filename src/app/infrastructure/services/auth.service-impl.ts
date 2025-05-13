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

  constructor(private logarUsuarioUseCase: LogarUsuarioUseCase, private buscarDadosDeUsuario: BuscarDadosDeUsuarioUseCase, private deslogarUsuarioUseCase: DeslogarUsuarioUseCase) { }
  private _router = inject(Router);

  async logar(login: LoginDto): Promise<ResponseData<AuthDTO>> {
    return new Promise((resolve, reject) => {
      this.logarUsuarioUseCase.execute(login).subscribe({
        next: async (auth: ResponseData<AuthDTO>) => {
          if (auth) {
            this.setLocalStorage(auth);
            await this.getDataUser();
            this._router.navigate(["/aplicacoes/inicio"]);
            resolve(auth);
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

  public getDataUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.buscarDadosDeUsuario.execute().subscribe({
        next: (response) => {
          this.setDataUserLocalStorage(response);
          resolve();
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  public async setDataUserLocalStorage(usuario: ResponseData<UsuarioLogadoResponse>) {
    localStorage.setItem("nmUsuario", usuario.data.nmUsuario);
    localStorage.setItem("idInstituicao", usuario.data.idInstituicao);
    localStorage.setItem("role", usuario.data.role)
    localStorage.setItem("cdUsuario", usuario.data.cdUsuario.toString())
  }

  public getNomeUsuario() {
    return localStorage.getItem('nmUsuario');
  }

  public deslogar(): void {
    this.deslogarUsuarioUseCase.execute().subscribe({
      next: () => {
        this.removeItemsLocalStorage();
        this._router.navigate(['/login']);
      },
      error: () => {
        this.removeItemsLocalStorage();
        localStorage.removeItem('accessToken');
        this._router.navigate(['/login']);
      }
    });

  }
  public removeItemsLocalStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem("nmUsuario");
    localStorage.removeItem("idInstituicao");
    localStorage.removeItem("role");
    localStorage.removeItem("cdUsuario");
    localStorage.removeItem('expiresIn');
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }

  public getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  public getIdInstituicaoUser(): string | null {
    return localStorage.getItem('idInstituicao');
  }

  public getRole(): string | null {
    return localStorage.getItem('role');
  }

  public getCdUsuario(): number | null {
    const cdUsuario = Number(localStorage.getItem('cdUsuario'))
    return cdUsuario
  }

  public getExpiresIn(): string | null {
    return localStorage.getItem('expiresIn');
  }
}
