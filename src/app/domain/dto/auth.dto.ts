export class AuthDTO {
  message: string;
  data:{
    accessToken: string;
    expiresIn: number;
  }
}