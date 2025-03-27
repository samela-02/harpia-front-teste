import { ModalService } from "@/infrastructure/services/modal/modal.service";
import { tableImports } from "@/presentation/shared/table-imports.module";
import { Component, Inject } from "@angular/core";
import { SnackbarService } from "@tivic-team/tivic-ui";
import { FormInstituicaoComponent } from "../form-instituicao/form-instituicao.component";

@Component({
    selector: "modal-create-grupo-equipamento",
    standalone: true,
    imports: [
        ...tableImports,
      FormInstituicaoComponent
    ],
    styleUrl: "./modal-create-instituicao.component.scss",
    templateUrl: "./modal-create-instituicao.component.html",
})
export class ModalCreateInstituicaoComponent {
    constructor(
        private snackbar: SnackbarService,
        protected modalService: ModalService<ModalCreateInstituicaoComponent>
    ) {}

    icon: string = "la la-industry"

    fecharModal() {
        this.modalService.dismiss();
    }
}
