import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FuelGagesState } from '../fuel-gages/fuel-gages.state';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsComponent implements OnChanges {
  @Input() totalCapacity: number = 0;
  @Input() state: FuelGagesState = FuelGagesState.RESETTING;
  @Input() totalQuantity$: Observable<number> = of(0);
  @Input() guess$: Observable<number> = of(0);
  @Output() restartButtonClicked$: EventEmitter<void> = new EventEmitter();
  @Output() guessSubmitted$: EventEmitter<number> = new EventEmitter();
  @ViewChild('guessInput') guessInput: ElementRef<HTMLInputElement> =
    {} as ElementRef;
  guess = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state']) {
      switch (changes['state'].currentValue) {
        case FuelGagesState.RESETTING:
          this.guess = '';
          break;
        case FuelGagesState.HIDDEN:
          // TODO: what is the correct lifecycle method to use to avoid setTimeout?
          setTimeout(() => this.guessInput.nativeElement.focus(), 0);
          break;
      }
    }
  }

  restartButtonClicked(): void {
    this.restartButtonClicked$.emit();
  }

  guessSubmitted(): void {
    const guess = Number.parseInt(this.guess);
    if (!Number.isNaN(guess) && 0 <= guess && guess <= this.totalCapacity) {
      this.guessSubmitted$.emit(guess);
    }
  }
}
