import { Signal, computed, signal } from '@angular/core';

export class FuelTank {
  private _level$ = signal(0);

  constructor(private readonly capacity: number) {}

  getCapacity(): number {
    return this.capacity;
  }

  setLevel(level: number): void {
    level = Math.max(0, Math.min(100, level));
    this._level$.set(level);
  }

  getLevel(): number {
    return this._level$();
  }

  getLevel$(): Signal<number> {
    return this._level$;
  }

  getQuantity$(): Signal<number> {
    return computed(() => {
      return Math.round((this._level$() / 100) * this.capacity);
    });
  }

  getOverlayLevels(): { level: number; label: string }[] {
    const quantities = [];
    for (const level of [0, 25, 50, 75, 100]) {
      quantities.push({
        level: level,
        label: `${Math.round((level / 100) * this.capacity)}`,
      });
    }
    return quantities;
  }
}
