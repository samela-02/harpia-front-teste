import { AuthDTO } from "@/domain/dto/auth.dto";
import { LoginDto } from "@/domain/dto/login.dto";
import { Observable } from "rxjs";

export abstract class LoginRepository {
  public abstract logarUsuario(loginDto: LoginDto): Observable<AuthDTO>
}