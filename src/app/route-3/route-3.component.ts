import { AfterViewInit, Component, ElementRef, Injector } from '@angular/core';
import * as angular from 'angular';
import { TextUtilsService } from '../shared/text-utils.service';
import { moduleName } from './route-3-angularjs.module';

@Component({
  template: `
    <h2>{{ title }}</h2>
    <div route-3-angularjs-root></div>
  `,
})
export class Route3Component implements AfterViewInit {
  title = 'Route 3';

  constructor(private elementRef: ElementRef, private injector: Injector) { }

  ngAfterViewInit() {
    const angularjsRoot = this.elementRef.nativeElement.querySelector('[route-3-angularjs-root]');
    const downgradedProviders = ['$provide', ($provide: angular.auto.IProvideService) => {
      $provide.factory('textUtils', () => this.injector.get(TextUtilsService));
    }];

    angular.bootstrap(angularjsRoot, [moduleName, downgradedProviders]);
  }
}
