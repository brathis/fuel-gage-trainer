import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { FuelTank } from './fuel-tank.model';
import { Subscription, interval, timer } from 'rxjs';
import { FuelGagesState } from './fuel-gages/fuel-gages.state';
import { Result } from './results/result.model';
import { RESULTS_SERVICE, ResultsService } from './results/results.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private static readonly MAX_DURATION = 30;

  readonly tanks = [new FuelTank(64), new FuelTank(112)];
  readonly totalCapacity: number = this.tanks
    .map((tank) => tank.getCapacity())
    .reduce((a, b) => a + b, 0);

  totalQuantity = computed(() => {
    let sum = 0;
    for (const tank of this.tanks) {
      sum += tank.getQuantity$()();
    }
    return sum;
  });
  fuelGagesState = signal(FuelGagesState.HIDDEN);
  time = signal(0);
  result = signal<Result | null>(null);
  showOverlay = signal(false);

  private _timeSubscription: Subscription | null = null;

  constructor(
    @Inject(RESULTS_SERVICE) private readonly resultsService: ResultsService,
  ) {}

  ngOnInit(): void {
    this.roll();
  }

  restartButtonClicked(): void {
    if (this.fuelGagesState() === FuelGagesState.VISIBLE) {
      this.roll();
    }
  }

  private roll(): void {
    this.fuelGagesState.set(FuelGagesState.RESETTING);
    for (const tank of this.tanks) {
      tank.setLevel(Math.random() * 100);
    }
    // FIXME: Instead of a timer, can we get an event when the CSS transition has completed?
    timer(2000).subscribe((_value) => {
      this.fuelGagesState.set(FuelGagesState.HIDDEN);
      this.time.set(0);
      this._timeSubscription = interval(1000).subscribe((_value) => {
        this.time.update((t) => t + 1);
        if (this.time() === AppComponent.MAX_DURATION) {
          this._timeSubscription?.unsubscribe();
        }
      });
    });
  }

  private reveal(guess: number): void {
    this._timeSubscription?.unsubscribe();
    this.fuelGagesState.set(FuelGagesState.VISIBLE);
    const result = new Result(
      new Date(),
      guess,
      this.totalQuantity(),
      this.time(),
    );
    this.result.set(result);
    this.resultsService.add(result);
  }

  guessSubmitted(guess: number): void {
    if (this.fuelGagesState() === FuelGagesState.HIDDEN) {
      this.reveal(guess);
    }
  }

  overlayToggled(visible: boolean): void {
    this.showOverlay.set(visible);
  }
}
