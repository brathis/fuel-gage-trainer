import { Injectable, OnInit } from '@angular/core';
import { ResultsService } from './results.service';
import { Result } from './result.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageResultsService implements ResultsService, OnInit {
  private static readonly KEY = 'results';
  private results: Result[] = [];

  constructor() {}

  ngOnInit(): void {
    this.load();
  }

  public add(result: Result | null): void {
    if (!result) {
      return;
    }
    this.results.push(result);
    this.persist();
  }

  public get(): Result[] {
    return this.results;
  }

  private load(): void {
    this.results =
      JSON.parse(
        localStorage.getItem(LocalStorageResultsService.KEY) ?? '[]',
      ) ?? [];
  }

  private persist(): void {
    localStorage.setItem(
      LocalStorageResultsService.KEY,
      JSON.stringify(this.results),
    );
  }
}
