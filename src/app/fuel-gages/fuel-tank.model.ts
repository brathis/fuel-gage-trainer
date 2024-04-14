import { BehaviorSubject, Observable, map } from 'rxjs';

export class FuelTank {
  private _level$ = new BehaviorSubject(0);

  constructor(private readonly capacity: number) {}

  setLevel(level: number): void {
    level = Math.max(0, Math.min(100, level));
    this._level$.next(level);
  }

  getLevel(): number {
    return this._level$.value;
  }

  getLevel$(): Observable<number> {
    return this._level$.asObservable();
  }

  getQuantity$(): Observable<number> {
    return this._level$.pipe(
      map((level: number) => Math.round((level / 100) * this.capacity)),
    );
  }
}
