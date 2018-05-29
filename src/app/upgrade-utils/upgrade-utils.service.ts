import { Injectable, InjectionToken, Injector, NgZone, Type } from '@angular/core';
import * as angular from 'angular';
import { UpgradeUtilsModule } from './upgrade-utils.module';

export interface DowngradableProviders {
  [key: string]: Type<any> | InjectionToken<any>;
}

@Injectable({
  providedIn: UpgradeUtilsModule,
})
export class UpgradeUtilsService {
  constructor(private injector: Injector, private ngZone: NgZone) { }

  bootstrap(root: HTMLElement, moduleName: string, providers: DowngradableProviders): () => void {
    const downgradedProviders = [
      '$provide',
      ($provide: angular.auto.IProvideService) =>
        Object.keys(providers).forEach(key =>
          $provide.factory(key, () => this.injector.get(providers[key]))),
    ];
    let injector: angular.auto.IInjectorService;

    this.ngZone.runOutsideAngular(() =>
      injector = angular.bootstrap(root, [moduleName, downgradedProviders], {strictDi: true}));

    return () => injector.get('$rootScope').$destroy();
  }
}
