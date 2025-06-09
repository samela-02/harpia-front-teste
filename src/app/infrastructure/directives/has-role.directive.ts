import { UsuarioRole } from '@/domain/enums/usuario-role.enum';
import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthServiceImpl } from '../services/auth.service-impl';

@Directive({
  selector: '[hasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private permiteAcao: Set<UsuarioRole> = new Set();

  @Input() hasRole: UsuarioRole[] = [];

  constructor(private authService: AuthServiceImpl) {
    this.permiteAcao.add(this.authService.getRole());
  }

  ngOnInit(): void {
    let permite = false;

    for (const role of this.hasRole) {
      if (this.permiteAcao.has(role)) {
        permite = true;
        break;
      }
    }
    if (permite) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
