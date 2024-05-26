import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { FuelGagesState } from '../fuel-gages/fuel-gages.state';
import { Result } from '../results/result.model';
import { FormsModule } from '@angular/forms';
import { NgIf, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, FormsModule, DecimalPipe],
})
export class ControlsComponent {
  totalCapacity = input.required<number>();
  state = input.required<FuelGagesState>();
  time = input.required<number>();
  result = input.required<Result | null>();
  overlayToggled = output<boolean>();
  restartButtonClicked = output<void>();
  guessSubmitted = output<number>();
  guessInput = viewChild('guessInput', { read: ElementRef<HTMLInputElement> });
  guess = '';

  constructor() {
    effect(() => {
      switch (this.state()) {
        case FuelGagesState.RESETTING:
          this.guess = '';
          this.overlayToggled.emit(false);
          break;
        case FuelGagesState.HIDDEN:
          // TODO: what is the correct way to use to avoid setTimeout?
          setTimeout(() => this.guessInput()?.nativeElement.focus(), 0);
          break;
      }
    });
  }

  emitGuessSubmitted(): void {
    const guess = Number.parseInt(this.guess);
    if (!Number.isNaN(guess) && 0 <= guess && guess <= this.totalCapacity()) {
      this.guessSubmitted.emit(guess);
    }
  }

  showOverlay(): void {
    this.overlayToggled.emit(true);
  }

  hideOverlay(): void {
    this.overlayToggled.emit(false);
  }
}
