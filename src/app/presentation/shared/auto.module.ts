import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AutocompleteComponent, HasErrorComponent } from "@tivic-team/tivic-ui";

export const autoShared = [
    ReactiveFormsModule, 
    AutocompleteComponent, 
    MatFormFieldModule, 
    HasErrorComponent
];