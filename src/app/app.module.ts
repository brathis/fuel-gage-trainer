import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FuelGagesComponent } from './fuel-gages/fuel-gages.component';
import { FuelGageComponent } from './fuel-gages/fuel-gage/fuel-gage.component';
import { ControlsComponent } from './controls/controls.component';
import { FormsModule } from '@angular/forms';
import { LocalStorageResultsService } from './local-storage-results.service';
import { RESULTS_SERVICE } from './results.service';
import { OverlayComponent } from './fuel-gages/fuel-gage/overlay/overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    FuelGagesComponent,
    FuelGageComponent,
    ControlsComponent,
    OverlayComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [
    { provide: RESULTS_SERVICE, useClass: LocalStorageResultsService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
