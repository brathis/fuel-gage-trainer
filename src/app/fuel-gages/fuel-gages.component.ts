import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FuelTank } from '../fuel-tank.model';

@Component({
  selector: 'app-fuel-gages',
  templateUrl: './fuel-gages.component.html',
  styleUrls: ['./fuel-gages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuelGagesComponent {
  tanks = input.required<FuelTank[]>();
  showOverlay = input.required<boolean>();
}
