import * as angular from 'angular';
import { LoggerService } from '../shared/logger.service';
import { TextUtilsService } from '../shared/text-utils.service';
import { StateService } from '../shared-angularjs/state.service';

export interface Item {
  id: string;
  value: string;
}

const route4RootDirective: angular.IDirectiveFactory = () => ({
  restrict: 'A',
  template: `
    <h3>{{ $ctrl.subtitle }}</h3>
    <p>Total visits to AngularJS routes: {{ $ctrl.visits }}</p>
    <route-4-data-list></route-4-data-list>
  `,
  controllerAs: '$ctrl',
  controller: class Route4RootController {
    static $inject = ['state', 'textUtils'];
    subtitle = this.textUtils.toLowerCase('Powered by AngularJS');
    visits = ++this.state.visits;

    constructor(private state: StateService, private textUtils: TextUtilsService) { }
  },
});

const dataListComponent: angular.IComponentOptions = {
  template: `
    <h2>
      Data
      <button ng-click="$ctrl.loadData()" style="float:right">Refresh</button>
    </h2>
    <ng-switch on="$ctrl.data.length">
      <i ng-switch-when="0">{{ $ctrl.loading ? 'Loading...' : 'No data found.' }}</i>
      <ul ng-switch-default style="border:1px solid black">
        <li ng-repeat="d in $ctrl.data track by d.id">[{{ d.id }}] {{ d.value }}</li>
      </ul>
    </ng-switch>
  `,
  controller: class DataListController {
    static $inject = ['$http', '$q', '$timeout', 'logger'];
    static DATA_URL = '/assets/mock-data.json';
    data: Item[];
    loading: boolean;

    constructor(
        private $http: angular.IHttpService,
        private $q: angular.IQService,
        private $timeout: angular.ITimeoutService,
        private logger: LoggerService) { }

    $onInit() {
      this.loadData();
    }

    loadData() {
      this.data = [];
      this.loading = true;

      this.logger.log('Loading data from server...');

      this.$q.
        all({
          simulatedDelay: this.$timeout(2000),
          response: this.$http.get<Item[]>(DataListController.DATA_URL),
        }).
        then(({response}) => this.data = response.data).
        catch(error => console.error(error)).
        finally(() => {
          this.loading = false;
          this.logger.log('Done loading data.');
        });
    }
  }
};

export const moduleName = angular.
  module('route4', []).
  directive('route4AngularjsRoot', route4RootDirective).
  component('route4DataList', dataListComponent).
  name;
