import { ResponseData } from "@/application/dtos/response-data.dto";
import { AuthDTO } from "../dtos/auth.dto";
import { LoginDto } from "../dtos/login.dto";

export interface AuthService {
  logar(loginDto: LoginDto): Promise<ResponseData<AuthDTO>>,
  deslogar(): void,
  isLoggedIn(): boolean;
  getToken(): string | null
}
