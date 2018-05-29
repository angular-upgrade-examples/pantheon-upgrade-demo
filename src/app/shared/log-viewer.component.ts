import { Component } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-log-viewer',
  template: `
    <form>
      <label>
        Log a message:
        <input type="text" value="{{ 'Just another message' }}" #message />
      </label>
      <button type="button" (click)="logger.log(message.value)">Log</button>
    </form>
    <h2>
      Logs <small>(Angular component)</small>
      <button (click)="logger.clear()" style="float:right">Clear</button>
      <button (click)="'just trigger CD'" style="float:right">Refresh</button>
    </h2>
    <ng-container [ngSwitch]="logger.logs.length">
      <i *ngSwitchCase="0">No logs yet.</i>
      <ul *ngSwitchDefault style="border:1px solid black">
        <li *ngFor="let l of logger.logs">{{ l }}</li>
      </ul>
    </ng-container>
  `,
})
export class LogViewerComponent {
  constructor(public logger: LoggerService) { }
}
