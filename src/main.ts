import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { LocalStorageResultsService } from './app/results/local-storage-results.service';
import { RESULTS_SERVICE } from './app/results/results.service';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule),
    { provide: RESULTS_SERVICE, useClass: LocalStorageResultsService },
  ],
}).catch((err) => console.error(err));
