import { Modules } from "@/domain/dtos/modules.dto";
import { RouteData } from "@/domain/interfaces/route-data.interface";
import { AuthServiceImpl } from "@/infrastructure/services/auth.service-impl";
import { CommonModule, DatePipe } from "@angular/common";
import { ChangeDetectorRef, Component, inject, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { environment } from "@env/environment.development";
import { BadgeComponent, ModalService, NameFormatterPipe, TimerComponent } from "@tivic-team/tivic-ui";
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { filter } from 'rxjs/operators';
import jsonModules from "../../../../../assets/modules/module.json";
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { ModalFormProfileComponent } from "./components/modal-form-profile/modal-form-profile.component";
export class UsuarioInfo {
  nmUsuario: string;
  idInstituicao: string;
  role: string;
  cdUsuario: number;
}
@Component({
    selector: "app-sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.scss"],
    standalone: true,
    imports: [
    MatSidenavModule,
    BreadcrumbComponent,
    BadgeComponent,
    DatePipe,
    MatButtonModule,
    NameFormatterPipe,
    TimerComponent,
    MatExpansionModule,
    AngularLineawesomeModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    CommonModule,
]
})
export class SidenavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  private _modalService = inject(ModalService<ModalFormProfileComponent>);
  modules: Modules[] = jsonModules;
  isExpanded = false;
  selectedModule: any = null;
  moduleName: string;
  usuarioInfo = new UsuarioInfo
  expiresIn: number;
  timerInterval: any;

  date = new Date();
  version = environment.version;
  currentRouteData: RouteData;

  ngOnInit(): void {
    this.buscaDadosUsuario();
    this.iniciarContadorExpiracao();
  }

  constructor(private cdr: ChangeDetectorRef, private router: Router, private authService: AuthServiceImpl,) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.router.routerState.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      this.currentRouteData = route.snapshot.data as RouteData;
    });
  }

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  abrirSidenaveEDropdown(module: any) {
    this.selectedModule = module;
    if (!this.isExpanded) {
      this.toggleSidenav();
    }
  }

  buscaDadosUsuario() {
    this.usuarioInfo.nmUsuario = this.authService.getNomeUsuario()
    this.usuarioInfo.idInstituicao  = this.authService.getIdInstituicaoUser()
    this.usuarioInfo.role = this.authService.getRole()
    this.usuarioInfo.cdUsuario = this.authService.getCdUsuario()
    console.log(this.usuarioInfo)
  }

  iniciarContadorExpiracao() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    const expiresInSeconds = Number(this.authService.getExpiresIn());
    if (!expiresInSeconds) {
      return;
    }

    this.atualizarTempoRestante();

    this.timerInterval = setInterval(() => {
      this.atualizarTempoRestante();
    }, 1000);
  }

  atualizarTempoRestante() {
    const tokenTime = Number(this.authService.getExpiresIn());
    if (!tokenTime) {
      this.expiresIn = 0;
      return;
    }

    const agora = Date.now();
    this.expiresIn = Math.max(0, tokenTime - agora);

    if (this.expiresIn <= 0) {
      clearInterval(this.timerInterval);
      this.deslogarUsuario();
    }
  }

  deslogarUsuario() {
    console.log('ojo')
    clearInterval(this.timerInterval);
    this.authService.deslogar();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  openModalProfile() {
    console.log(this.usuarioInfo.cdUsuario)
    this._modalService.component(ModalFormProfileComponent).open(this.usuarioInfo.cdUsuario);
  }
}
