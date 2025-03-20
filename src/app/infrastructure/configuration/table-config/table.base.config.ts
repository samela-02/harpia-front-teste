import { FormGroup } from "@angular/forms";

export class TableBase {
    protected formGroup!: FormGroup;
    protected pageSize: number = 15;
}
