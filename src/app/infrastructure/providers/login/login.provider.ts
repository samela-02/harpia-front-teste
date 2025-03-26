import { LoginRepository } from "@/application/repositories/login.repository"
import { DeslogarUsuarioUseCase } from "@/application/usecase/login/deslogar-usuario.usecase"
import { LogarUsuarioUseCase } from "@/application/usecase/login/logar-usuario.usecase"
import { LoginRepostoryImpl } from "@/infrastructure/repository/login-impl.repository"

export const logarUsuarioProvider = {
  provide: LogarUsuarioUseCase,
  useFactory: (loginRepository: LoginRepository) => new LogarUsuarioUseCase(loginRepository),
  deps: [LoginRepository]
}

export const deslogarUsuarioProvider = {
  provide: DeslogarUsuarioUseCase,
  useFactory: (loginRepository: LoginRepository) => new DeslogarUsuarioUseCase(loginRepository),
  deps: [LoginRepository]
}

export const loginProviders = [
  logarUsuarioProvider,
  deslogarUsuarioProvider,
  {
    provide: LoginRepository,
    useClass: LoginRepostoryImpl
  }
]
