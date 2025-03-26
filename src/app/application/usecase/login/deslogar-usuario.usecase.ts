import { LoginRepository } from "@/application/repositories/login.repository";

export class DeslogarUsuarioUseCase {
  constructor(private loginRepository: LoginRepository) { }

  execute() {
    return this.loginRepository.deslogarUsuario();
  }
}