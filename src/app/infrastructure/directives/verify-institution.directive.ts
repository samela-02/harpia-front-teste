import { Directive, inject, Input, TemplateRef, ViewContainerRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthServiceImpl } from '../services/auth.service-impl';

@Directive({
  selector: '[verifyInstitution]',
  standalone: true
})
export class VerifyInstitutionDirective implements OnInit, OnChanges {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private setarIntuicoesPermitidas: Set<string> = new Set();
  private instituicaoUsuario = this.authService.getIdInstituicaoUser();

  @Input() verifyInstitution: string[] = [];

  constructor(private authService: AuthServiceImpl) {}

  ngOnInit() {
    this.updatePermissions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['verifyInstitution']) {
      this.updatePermissions();
    }
  }

  private updatePermissions() {
    this.setarIntuicoesPermitidas.clear();
    this.verifyInstitution.forEach(inst => this.setarIntuicoesPermitidas.add(inst));
    this.verifyPermission();
  }

  private verifyPermission() {
    let permite = this.setarIntuicoesPermitidas.has(this.instituicaoUsuario);

    if(permite && this.viewContainer.length === 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if(!permite) {
      this.viewContainer.clear();
    }
  }
}
