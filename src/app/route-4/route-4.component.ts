import { AfterViewInit, Component, ElementRef } from '@angular/core';
import * as angular from 'angular';
import { moduleName } from './route-4-angularjs.module';

@Component({
  template: `
    <h2>{{ title }}</h2>
    <div route-4-angularjs-root></div>
  `,
})
export class Route4Component implements AfterViewInit {
  title = 'Route 4';

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    const angularjsRoot = this.elementRef.nativeElement.querySelector('[route-4-angularjs-root]');
    angular.bootstrap(angularjsRoot, [moduleName]);
  }
}
