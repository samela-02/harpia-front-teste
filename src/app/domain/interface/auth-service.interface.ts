import { ResponseData } from "@/application/dtos/response-data.dto";
import { AuthDTO } from "../dto/auth.dto";
import { LoginDto } from "../dto/login.dto";

export interface AuthService {
  logar(loginDto: LoginDto): Promise<ResponseData<AuthDTO>>,
  deslogar(): void,
  isLoggedIn(): boolean;
  getToken(): string | null
}