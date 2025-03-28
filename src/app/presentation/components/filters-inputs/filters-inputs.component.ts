import { Overlay, OverlayModule, PositionStrategy } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-filters-inputs',
  standalone: true,
  imports: [MatIcon, MatFormFieldModule, MatFormField, CommonModule, FormsModule, MatInputModule, MatButtonModule, OverlayModule],
  templateUrl: './filters-inputs.component.html',
  styleUrl: './filters-inputs.component.scss'
})
export class FiltersInputsComponent {
  isOpen = true;
  positionStrategy: PositionStrategy;

  constructor(private overlay: Overlay) {
    // this.positionStrategy = this.overlay.position()
    //   .flexibleConnectedTo(trigger)
    //   .withPositions([
    //     {
    //       originX: 'end',
    //       originY: 'bottom',
    //       overlayX: 'end',
    //       overlayY: 'top',
    //       offsetY: 8
    //     }
    //   ]);
  }
}
