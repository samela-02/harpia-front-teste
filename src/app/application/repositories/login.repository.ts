import { AuthDTO } from "@/domain/dtos/auth.dto";
import { LoginDto } from "@/domain/dtos/login.dto";
import { Observable } from "rxjs";
import { ResponseData } from "../dtos/response-data.dto";

export abstract class LoginRepository {
  public abstract logarUsuario(loginDto: LoginDto): Observable<ResponseData<AuthDTO>>
  public abstract deslogarUsuario():Observable<void>;
}
