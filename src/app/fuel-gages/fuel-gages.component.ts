import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FuelTank } from '../fuel-tank.model';
import { FuelGageComponent } from './fuel-gage/fuel-gage.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-fuel-gages',
  templateUrl: './fuel-gages.component.html',
  styleUrls: ['./fuel-gages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor, FuelGageComponent],
})
export class FuelGagesComponent {
  tanks = input.required<FuelTank[]>();
  showOverlay = input.required<boolean>();
}
