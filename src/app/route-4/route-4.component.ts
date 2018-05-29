import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import * as angular from 'angular';
import { Subject } from 'rxjs';
import { LoggerService } from '../shared/logger.service';
import { TextUtilsService } from '../shared/text-utils.service';
import { UpgradeUtilsService } from '../upgrade-utils/upgrade-utils.service';
import { moduleName } from './route-4-angularjs.module';

@Component({
  template: `
    <h2>{{ title }}</h2>
    <div route-4-angularjs-root></div>
  `,
})
export class Route4Component implements AfterViewInit, OnDestroy {
  title = 'Route 4';
  private onDestroy$ = new Subject<void>();

  constructor(private elementRef: ElementRef, private upgradeUtils: UpgradeUtilsService) { }

  ngAfterViewInit() {
    const angularjsRoot = this.elementRef.nativeElement.querySelector('[route-4-angularjs-root]');
    const cleanUp = this.upgradeUtils.bootstrap(angularjsRoot, moduleName, {
      logger: LoggerService,
      textUtils: TextUtilsService,
    });

    this.onDestroy$.subscribe(cleanUp);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
