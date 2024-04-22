import { Component, OnInit } from '@angular/core';
import { FuelTank } from './fuel-gages/fuel-tank.model';
import { Subscription, combineLatest, interval, timer } from 'rxjs';
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

  totalQuantity: number = 0;
  guess: number = 0;
  fuelGagesState = FuelGagesState.HIDDEN;
  time = 0;
  timeSubscription: Subscription | null = null;

  constructor() {
    const quantityObservables = [];
    for (const tank of this.tanks) {
      quantityObservables.push(tank.getQuantity$());
    }
    combineLatest(quantityObservables).subscribe((quantities) => {
      let sum = 0;
      for (let quantity of quantities) {
        sum += quantity;
      }
      this.totalQuantity = sum;
    });
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
      this.time = 0;
      this.timeSubscription = interval(1000).subscribe((_value) => {
        ++this.time;
      });
    });
  }

  private reveal(guess: number): void {
    this.timeSubscription?.unsubscribe();
    this.fuelGagesState = FuelGagesState.VISIBLE;
    this.guess = guess;
  }

  guessSubmitted(guess: number): void {
    if (this.fuelGagesState === FuelGagesState.HIDDEN) {
      this.reveal(guess);
    }
  }
}
