import { Component, OnInit } from '@angular/core';
import { FuelTank } from './fuel-gages/fuel-tank.model';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  map,
  timer,
} from 'rxjs';
import { FuelGagesState } from './fuel-gages/fuel-gages.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  readonly tanks = [new FuelTank(64), new FuelTank(112)];
  readonly totalCapacity = this.tanks
    .map((tank) => tank.getCapacity())
    .reduce((a, b) => a + b, 0);

  totalQuantity$: Observable<number>;
  guess$: Subject<number>;
  fuelGagesState = FuelGagesState.HIDDEN;

  constructor() {
    const quantityObservables = [];
    for (const tank of this.tanks) {
      quantityObservables.push(tank.getQuantity$());
    }
    this.totalQuantity$ = combineLatest(quantityObservables).pipe(
      map((quantities) => {
        let sum = 0;
        for (let quantity of quantities) {
          sum += quantity;
        }
        return sum;
      }),
    );
    this.guess$ = new BehaviorSubject(0);
  }

  ngOnInit(): void {
    this.roll();
  }

  restartButtonClicked(): void {
    if (this.fuelGagesState === FuelGagesState.VISIBLE) {
      this.roll();
    }
  }

  private roll(): void {
    this.fuelGagesState = FuelGagesState.RESETTING;
    for (const tank of this.tanks) {
      tank.setLevel(Math.random() * 100);
    }
    // FIXME: Instead of a timer, can we get an event when the CSS transition has completed?
    timer(2000).subscribe((_value) => {
      this.fuelGagesState = FuelGagesState.HIDDEN;
    });
  }

  private reveal(guess: number): void {
    this.fuelGagesState = FuelGagesState.VISIBLE;
    this.guess$.next(guess);
  }

  guessSubmitted(guess: number): void {
    if (this.fuelGagesState === FuelGagesState.HIDDEN) {
      this.reveal(guess);
    }
  }
}
