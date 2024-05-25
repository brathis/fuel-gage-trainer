export class Result {
  constructor(
    private readonly instant: Date,
    private readonly guess: number,
    private readonly actual: number,
    private readonly time: number,
  ) {}

  getInstant(): Date {
    return this.instant;
  }

  getGuess(): number {
    return this.guess;
  }

  getActual(): number {
    return this.actual;
  }

  getError(): number {
    return this.guess - this.actual;
  }

  getTime(): number {
    return this.time;
  }
}
