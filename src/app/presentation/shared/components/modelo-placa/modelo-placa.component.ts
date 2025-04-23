import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'modelo-placa',
    templateUrl: './modelo-placa.component.html',
    standalone: true,
    imports: [CommonModule],
    styleUrls: ['./modelo-placa.component.scss']
})
export class ModeloPlacaComponent {
    @Input() nmPlaca: string;
    isFliped: boolean;

    ngOnInit() {
        this.handlePlacaValue(this.nmPlaca);
    }

    handlePlacaValue(nmPlaca: string) {
        this.nmPlaca = nmPlaca && nmPlaca !== "" ? nmPlaca : null;
        if (this.nmPlaca && this.nmPlaca.length > 4) {
            const quintoCaractere: string = nmPlaca.charAt(4);
            if (!isNaN(Number(quintoCaractere))) {
                this.isFliped = true;
                return;
            }
        }
        this.isFliped = false;
    }
}
