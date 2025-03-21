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
    @Input() nrPlaca: string;
    isFliped: boolean;

    ngOnInit() {
        this.handlePlacaValue(this.nrPlaca);
    }

    handlePlacaValue(nrPlaca: string) {
        this.nrPlaca = nrPlaca && nrPlaca !== "" ? nrPlaca : null;
        if (this.nrPlaca && this.nrPlaca.length > 4) {
            const quintoCaractere: string = nrPlaca.charAt(4);
            if (!isNaN(Number(quintoCaractere))) {
                this.isFliped = true;
                return;
            }
        }
        this.isFliped = false;
    }
}
