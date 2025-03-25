import { ResponseData } from "@/application/dtos/response-data.dto";
import { LoginRepository } from "@/application/repositories/login.repository";
import { AuthDTO } from "@/domain/dto/auth.dto";
import { LoginDto } from "@/domain/dto/login.dto";
import { inject } from "@angular/core";
import { Client } from "@tivic-team/tivic-ui";
import { Observable } from "rxjs";

export class LoginRepostoryImpl implements LoginRepository {
  private _client = inject(Client);
  private readonly _api = "auth";

  logarUsuario(loginDto: LoginDto): Observable<ResponseData<AuthDTO>> {
    return this._client.post(this._api, loginDto)
  }
}