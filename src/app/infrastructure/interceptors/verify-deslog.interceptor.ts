import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthServiceImpl } from "../services/auth.service-impl";
import { catchError, Observable } from "rxjs";

export class VerifyStatusInterceptor implements HttpInterceptor {

  private _authService = inject(AuthServiceImpl)

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this._authService.deslogar()
        }
        throw error;
      })
    );
  }
}