import { AuthService } from '@/domain/interface/auth-service.interface';
import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceImpl } from '../services/auth.service-impl';

export class AuthInterceptor implements HttpInterceptor {

  private _authService = inject(AuthServiceImpl)

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this._authService.getToken();

        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: token,
                },
            });
        }
        return next.handle(req);
    }
}
