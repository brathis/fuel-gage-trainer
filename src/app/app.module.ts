import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FuelGagesComponent } from './fuel-gages/fuel-gages.component';
import { FuelGageComponent } from './fuel-gages/fuel-gage/fuel-gage.component';
import { ControlsComponent } from './controls/controls.component';

@NgModule({
  declarations: [
    AppComponent,
    FuelGagesComponent,
    FuelGageComponent,
    ControlsComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
