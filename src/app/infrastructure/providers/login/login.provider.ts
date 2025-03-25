import { LoginRepository } from "@/application/repositories/login.repository"
import { LogarUsuarioUseCase } from "@/application/usecase/logar-usuario.usecase"
import { LoginRepostoryImpl } from "@/infrastructure/repository/login-impl.repository"

export const logarUsuarioProvider = {
  provide: LogarUsuarioUseCase,
  useFactory: (loginRepository: LoginRepository) => new LogarUsuarioUseCase(loginRepository),
  deps: [LoginRepository]
}

export const loginProviders = [
  logarUsuarioProvider,
  {
    provide: LoginRepository,
    useClass: LoginRepostoryImpl
  }
]
