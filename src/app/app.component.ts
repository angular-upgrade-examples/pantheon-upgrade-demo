import { Component } from '@angular/core';
import { TextUtilsService } from './shared/text-utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = this.textUtils.toUpperCase('Pantheon Upgrade Demo');

  constructor(private textUtils: TextUtilsService) { }
}
