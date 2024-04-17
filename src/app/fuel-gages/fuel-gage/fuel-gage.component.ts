import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-fuel-gage',
  templateUrl: './fuel-gage.component.html',
  styleUrls: ['./fuel-gage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuelGageComponent implements OnChanges {
  @Input() level: number | null = 0;

  private static readonly a0 = 5.5;
  private static readonly a1 = 0.445;
  private static readonly a2 = 0.00183;
  private static readonly a3 = 0.000104;
  private static readonly a4 = -0.00000101;

  handRotationDeg: string = 'none';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['level']) {
      const level = changes['level'].currentValue ?? 0;
      this.handRotationDeg = `rotate(${this.getDegrees(level)}deg`;
    }
  }

  private getDegrees(level: number): number {
    level = Math.max(Math.min(level, 100), 0);
    return (
      FuelGageComponent.a0 +
      FuelGageComponent.a1 * level +
      FuelGageComponent.a2 * Math.pow(level, 2) +
      FuelGageComponent.a3 * Math.pow(level, 3) +
      FuelGageComponent.a4 * Math.pow(level, 4)
    );
  }
}
