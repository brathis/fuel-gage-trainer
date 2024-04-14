import { Component, OnInit } from '@angular/core';
import { FuelTank } from './fuel-tank.model';
import { Observable, combineLatest, map, timer } from 'rxjs';
import { FuelGagesState } from './fuel-gages.state';

@Component({
  selector: 'app-fuel-gages',
  templateUrl: './fuel-gages.component.html',
  styleUrls: ['./fuel-gages.component.css'],
})
export class FuelGagesComponent implements OnInit {
  readonly tanks = [new FuelTank(64), new FuelTank(112)];

  totalQuantity$: Observable<number>;
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
      })
    );
  }

  ngOnInit(): void {
    this.roll();
  }

  buttonClicked(): void {
    if (this.fuelGagesState === FuelGagesState.VISIBLE) {
      this.roll();
    } else if (this.fuelGagesState === FuelGagesState.HIDDEN) {
      this.reveal();
    }
  }

  private roll(): void {
    this.fuelGagesState = FuelGagesState.RESETTING;
    for (const tank of this.tanks) {
      tank.setLevel(Math.random() * 100);
    }
    // FIXME: Instead of a timer, can we get an event when the CSS transition has completed?
    timer(2000).subscribe(_value => {
      this.fuelGagesState = FuelGagesState.HIDDEN;
    });
  }

  private reveal(): void {
    this.fuelGagesState = FuelGagesState.VISIBLE;
  }
}
