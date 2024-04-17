import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FuelGagesState } from '../fuel-gages/fuel-gages.state';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent {
  @Input() state: FuelGagesState = FuelGagesState.RESETTING;
  @Input() totalQuantity$: Observable<number> = of(0);
  @Output() buttonClicked$: EventEmitter<void> = new EventEmitter();

  buttonClicked(): void {
    this.buttonClicked$.emit();
  }
}
