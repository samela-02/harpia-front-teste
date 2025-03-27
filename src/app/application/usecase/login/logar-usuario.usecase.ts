import { LoginDto } from "@/domain/dtos/login.dto";
import { LoginRepository } from "../../repositories/login.repository";
import { Observable } from "rxjs";
import { AuthDTO } from "@/domain/dtos/auth.dto";
import { ResponseData } from "../../dtos/response-data.dto";

export class LogarUsuarioUseCase {
  constructor(private loginRepository: LoginRepository){}

  public execute(loginDto: LoginDto): Observable<ResponseData<AuthDTO>> {
    return this.loginRepository.logarUsuario(loginDto);
  }
}
