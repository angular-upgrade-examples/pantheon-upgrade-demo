import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  logs: string[] = [];

  clear(): void {
    this.logs.length = 0;
  }

  log(msg: string): void {
    this.logs.push(msg);
  }
}
