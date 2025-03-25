import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import {
  AuthLibModule,
  AuthModule,
  BreadcrumbComponent,
  CustomDialogService,
  CustomFormBuilder,
  LoaderService, ModalService,
  paginatorProviders,
  PermissaoModule,
  SnackbarService
} from "@tivic-team/tivic-ui";
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { provideNgxMask } from 'ngx-mask';
import { maskConfig } from '../assets/config/mask.config';
import { provideAnimations } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { infraProviders } from './infrastructure/providers';
import { AuthInterceptor } from './infrastructure/interceptors/auth-config.interceptor';
registerLocaleData(localePT);

const providers = [
  SnackbarService,
  LoaderService,
  CustomFormBuilder,
  CustomDialogService,
  ModalService,
  provideNgxMask(maskConfig),
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    importProvidersFrom(
      MatSnackBarModule,
      MatDialogModule,
    ),
    BreadcrumbComponent,
    ...providers,
    infraProviders,
    paginatorProviders,
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
