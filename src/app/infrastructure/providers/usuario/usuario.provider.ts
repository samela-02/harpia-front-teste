import { UsuarioRepository } from "@/application/repositories/usuario.repository"
import { BuscarDadosDeUsuarioUseCase } from "@/application/usecase/usuario/buscar-dados-de-usuario.usecase"
import { UsuarioRepostoryImpl } from "@/infrastructure/repository/usuario-impl.repository"

export const buscarDadosDeUsuarioProvider = {
  provide: BuscarDadosDeUsuarioUseCase,
  useFactory: (usuarioRepository: UsuarioRepository) => new BuscarDadosDeUsuarioUseCase(usuarioRepository),
  deps: [UsuarioRepository]
}

export const usuarioProviders = [
  buscarDadosDeUsuarioProvider,
  {
    provide: UsuarioRepository,
    useClass: UsuarioRepostoryImpl
  }
]
