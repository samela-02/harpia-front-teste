import { ModulosDto } from "@/application/dtos/modulos.dto";
import { ModulosAdministradoresStrategy } from "@/application/modulo/modulos-administradores.strategy";
import { ModulosCoordenadoresStrategy } from "@/application/modulo/modulos-coordenadores.strategy";
import { ModulosOperadorCentralStrategy } from "@/application/modulo/modulos-operador-central.strategy";
import { Modules } from "@/domain/dtos/modules.dto";
import { UsuarioRole } from "@/domain/enums/usuario-role.enum";
import { RouteData } from "@/domain/interfaces/route-data.interface";
import { AuthServiceImpl } from "@/infrastructure/services/auth.service-impl";
import { CommonModule, DatePipe } from "@angular/common";
import { Component, inject, ViewChild } from "@angular/core";
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
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { ModalFormProfileComponent } from "./components/modal-form-profile/modal-form-profile.component";
import { ModulosStrategyFactory } from "@/application/modulo/modulo-startegy.factory";
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

  isExpanded: boolean = false;
  selectedModule: any = null;
  moduleName: string;
  usuarioInfo = new UsuarioInfo
  expiresIn: number;
  timerInterval: any;
  modulos: ModulosDto[];
  nivelUsuario: UsuarioRole = this.authService.getRole()

  date = new Date();
  version = environment.version;
  currentRouteData: RouteData;

  moduloStrategy: any;

  ngOnInit(): void {
    this.buscaDadosUsuario();
    this.iniciarContadorExpiracao();
  }

  constructor(private router: Router, private authService: AuthServiceImpl) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.router.routerState.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      this.currentRouteData = route.snapshot.data as RouteData;
    });
    this.defineModulos()
  }

  private defineModulos() {
    console.log(this.nivelUsuario)
    if (this.nivelUsuario == UsuarioRole.ADMINISTRADOR) {
      this.moduloStrategy = new ModulosAdministradoresStrategy
    }
    if (this.nivelUsuario == UsuarioRole.COORDENADOR_OPERACAO) {
      console.log(this.nivelUsuario)
      this.moduloStrategy = new ModulosCoordenadoresStrategy
    }
    if (this.nivelUsuario == UsuarioRole.OPERADOR_CENTRAL) {
      this.moduloStrategy = new ModulosOperadorCentralStrategy
    }

    this.modulos = new ModulosStrategyFactory(this.moduloStrategy).getModulos()

    console.log(this.modulos)
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
    clearInterval(this.timerInterval);
    this.authService.deslogar();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  openModalProfile() {
    this._modalService.component(ModalFormProfileComponent).open(this.usuarioInfo.cdUsuario);
  }
}
