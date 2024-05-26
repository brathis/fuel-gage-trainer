import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { OverlayComponent } from './overlay/overlay.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-fuel-gage',
  templateUrl: './fuel-gage.component.html',
  styleUrls: ['./fuel-gage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgStyle, OverlayComponent],
})
export class FuelGageComponent {
  level = input.required<number | null>();
  overlayLevels = input.required<{ level: number; label: string }[]>();
  showOverlay = input.required<boolean>();

  handRotationDeg = computed(() => {
    return `rotate(${this.getDegrees(this.level() ?? 0)}deg`;
  });

  private static readonly a0 = 5.5;
  private static readonly a1 = 0.445;
  private static readonly a2 = 0.00183;
  private static readonly a3 = 0.000104;
  private static readonly a4 = -0.00000101;

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
