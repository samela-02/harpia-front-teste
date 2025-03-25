import { AuthDTO } from "../dto/auth.dto";
import { LoginDto } from "../dto/login.dto";

export interface AuthService {
  logar(loginDto: LoginDto): Promise<AuthDTO>,
  deslogar(): void,
  isLoggedIn(): boolean;
  getToken(): string | null
}