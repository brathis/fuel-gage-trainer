import { InjectionToken } from '@angular/core';
import { Result } from './result.model';

export const RESULTS_SERVICE = new InjectionToken<ResultsService>(
  'services.results',
);

export interface ResultsService {
  add(result: Result): void;
  get(): Result[];
}
