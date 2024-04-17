import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FuelTank } from './fuel-tank.model';

@Component({
  selector: 'app-fuel-gages',
  templateUrl: './fuel-gages.component.html',
  styleUrls: ['./fuel-gages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuelGagesComponent {
  @Input() tanks: FuelTank[] = [];
}
