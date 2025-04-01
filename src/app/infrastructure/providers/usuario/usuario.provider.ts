import { UsuarioRepository } from "@/application/repositories/usuario.repository"
import { BuscarDadosDeUsuarioUseCase } from "@/application/usecase/usuario/buscar-dados-de-usuario.usecase"
import { BuscarUsuariosUseCase } from "@/application/usecase/usuario/buscar-usuarios.usecase"
import { CriarUsuarioUseCase } from "@/application/usecase/usuario/criar-usuario.usecase"
import { DesativarUsuarioUseCase } from "@/application/usecase/usuario/desativar-usuario.usecase"
import { EditarUsuarioUseCase } from "@/application/usecase/usuario/editar-usuario.usecase"
import { UsuarioRepostoryImpl } from "@/infrastructure/repository/usuario-impl.repository"

export const buscarDadosDeUsuarioProvider = {
  provide: BuscarDadosDeUsuarioUseCase,
  useFactory: (usuarioRepository: UsuarioRepository) => new BuscarDadosDeUsuarioUseCase(usuarioRepository),
  deps: [UsuarioRepository]
}

export const buscarUsuariosProvider = {
  provide: BuscarUsuariosUseCase,
  useFactory: (usuarioRepository: UsuarioRepository) => new BuscarUsuariosUseCase(usuarioRepository),
  deps: [UsuarioRepository]
}

export const criarUsuarioProvider = {
  provide: CriarUsuarioUseCase,
  useFactory: (usuarioRepository: UsuarioRepository) => new CriarUsuarioUseCase(usuarioRepository),
  deps: [UsuarioRepository]
}

export const editarUsuarioProvider = {
  provide: EditarUsuarioUseCase,
  useFactory: (usuarioRepository: UsuarioRepository) => new EditarUsuarioUseCase(usuarioRepository),
  deps: [UsuarioRepository]
}

export const desativarUsuarioProvider = {
  provide: DesativarUsuarioUseCase,
  useFactory: (usuarioRepository: UsuarioRepository) => new DesativarUsuarioUseCase(usuarioRepository),
  deps: [UsuarioRepository]
}

export const usuarioProviders = [
  buscarDadosDeUsuarioProvider,
  buscarUsuariosProvider,
  criarUsuarioProvider,
  editarUsuarioProvider,
  desativarUsuarioProvider,
  {
    provide: UsuarioRepository,
    useClass: UsuarioRepostoryImpl
  }
]
