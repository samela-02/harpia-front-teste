import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthServiceImpl } from "../services/auth.service-impl";
import { catchError, Observable } from "rxjs";
import { Router } from "@angular/router";
import { SnackbarService } from "@tivic-team/tivic-ui";

export class VerifyStatusInterceptor implements HttpInterceptor {
  private _authService = inject(AuthServiceImpl)
  private _router = inject(Router);
  private _snackbar = inject(SnackbarService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this._authService.removeItemsLocalStorage()
          this._snackbar.warning('A sua sessão foi encerrada. Por favor, entre novamente.');
          this._router.navigate(['/login']);
        }
        throw error;
      })
    );
  }
}