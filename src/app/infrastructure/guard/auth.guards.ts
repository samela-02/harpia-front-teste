
import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceImpl } from '../services/auth.service-impl';
@Injectable({
    providedIn: 'root',
})
export class AuthGuard {

    private authService = inject(AuthServiceImpl);
    private router = inject(Router);

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.authService.isLoggedIn() !== true) {
            this.router.navigate(['login']);
        }
        return true;
    }
}