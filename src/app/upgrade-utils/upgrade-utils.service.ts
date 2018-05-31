import { Inject, Injectable, InjectionToken, Injector, NgZone, Type } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import * as angular from 'angular';
import { LoggerService } from '../shared/logger.service';
import { moduleName as sharedAngularjsModuleName } from '../shared-angularjs/shared-angularjs.module';
import { UpgradeUtilsModule } from './upgrade-utils.module';

export interface DowngradableInjectables {
  [key: string]: Type<any> | InjectionToken<any>;
}

@Injectable({
  providedIn: UpgradeUtilsModule,
})
export class UpgradeUtilsService {
  private $injector: angular.auto.IInjectorService;
  private $compile: angular.ICompileService;
  private $rootScope: angular.IRootScopeService;
  private sharedDowngradableInjectables: DowngradableInjectables = {
    logger: LoggerService,
  };

  constructor(
      @Inject(DOCUMENT) private doc: Document,
      private injector: Injector,
      private ngZone: NgZone) { }

  bootstrap(root: Element, moduleName: string, injectables: DowngradableInjectables): () => void {
    return this.ngZone.runOutsideAngular(() => {
      this.bootstrapShared();

      // Note:
      // If the module has been already loaded (e.g. as part of visiting the same route before),
      // it will be loaded again. Its `config` and `run` blocks will be executed again as well.
      // If this is not desirable you can check if the module is already loaded with
      // `this.$injector.modules[moduleName]`.
      const downgradedInjectables = this.downgradeInjectables(injectables);
      (this.$injector as any).loadNewModules([moduleName, downgradedInjectables]);

      // Now that module has been loaded into the injector, compile the specified root node.
      const scope = this.$rootScope.$new();
      this.$compile(root)(scope);
      this.$rootScope.$digest();

      // Mark the root as AngularJS (for demo purposes only).
      root.classList.add('angularjs');

      return () => scope.$destroy();
    });
  }

  private bootstrapShared() {
    if (this.$injector) {
      // The shared AngularJS module has already been bootstrapped.
      return;
    }

    const root = this.doc.body;
    const downgradedInjectables = this.downgradeInjectables(this.sharedDowngradableInjectables);
    const modules = [sharedAngularjsModuleName, downgradedInjectables];

    this.$injector = angular.bootstrap(root, modules, {strictDi: true});
    this.$compile = this.$injector.get('$compile');
    this.$rootScope = this.$injector.get('$rootScope');
  }

  private downgradeInjectables(injectables: DowngradableInjectables) {
    return [
      '$provide',
      ($provide: angular.auto.IProvideService) =>
        Object.keys(injectables).forEach(key =>
          $provide.factory(key, () => this.injector.get(injectables[key]))),
    ];
  }
}
