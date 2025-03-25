import { LoginDto } from "@/domain/dto/login.dto";
import { LoginRepository } from "../repositories/login.repository";
import { Observable } from "rxjs";
import { AuthDTO } from "@/domain/dto/auth.dto";

export class LogarUsuarioUseCase {
  constructor(private loginRepository: LoginRepository){}

  public execute(loginDto: LoginDto): Observable<AuthDTO> {
    console.log('esta')
    return this.loginRepository.logarUsuario(loginDto);
  }
}