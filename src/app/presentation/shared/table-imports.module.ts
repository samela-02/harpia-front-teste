import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import {
    AcaoDirective,
    ButtonComponent, InputComponent, InputNormalizeDirective, InputSearchComponent,
    PermissaoModule
} from "@tivic-team/tivic-ui";

export const tableImports = [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatTooltipModule,
    MatIconModule,

    /**
     * Components LIB
     * @name tivic-team/tivic-core
     */
    AcaoDirective,
    PermissaoModule,
    InputNormalizeDirective,
    ButtonComponent,
    InputComponent,
    InputSearchComponent
];