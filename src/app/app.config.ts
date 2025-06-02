import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import localePT from '@angular/common/locales/pt';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  BreadcrumbComponent,
  CustomDialogService,
  CustomFormBuilder,
  LoaderService, ModalService,
  paginatorProviders,
  SnackbarService
} from "@tivic-team/tivic-ui";
import { provideNgxMask } from 'ngx-mask';
import { maskConfig } from '../assets/config/mask.config';
import { routes } from './app.routes';
import { AuthInterceptor } from './infrastructure/interceptors/auth-config.interceptor';
import { VerifyStatusInterceptor } from './infrastructure/interceptors/verify-deslog.interceptor';
import { infraProviders } from './infrastructure/store/infraProviders';
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
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass:  VerifyStatusInterceptor,
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
