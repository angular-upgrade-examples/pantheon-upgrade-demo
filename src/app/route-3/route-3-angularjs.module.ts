import * as angular from 'angular';
import { LoggerService } from '../shared/logger.service';
import { TextUtilsService } from '../shared/text-utils.service';
import { StateService } from '../shared-angularjs/state.service';

const route3RootDirective: angular.IDirectiveFactory = () => ({
  restrict: 'A',
  template: `
    <h3>{{ $ctrl.subtitle }}</h3>
    <p>Total visits to AngularJS routes: {{ $ctrl.visits }}</p>
    <route-3-log-viewer></route-3-log-viewer>
  `,
  controllerAs: '$ctrl',
  controller: class Route3RootController {
    static $inject = ['state', 'textUtils'];
    subtitle = this.textUtils.toUpperCase('Powered by AngularJS');
    visits = ++this.state.visits;

    constructor(private state: StateService, private textUtils: TextUtilsService) { }
  },
});

const logViewerComponent: angular.IComponentOptions = {
  template: `
    <form>
      <label>
        Log a message:
        <input type="text" ng-model="$ctrl.message" ng-init="$ctrl.message = 'Just another message'" />
      </label>
      <button type="button" ng-click="$ctrl.logger.log($ctrl.message)">Log</button>
    </form>
    <h2>
      Logs <small>(AngularJS component)</small>
      <button ng-click="$ctrl.logger.clear()" style="float:right">Clear</button>
      <button ng-click="'just trigger CD'" style="float:right">Refresh</button>
    </h2>
    <ng-switch on="$ctrl.logger.logs.length">
      <i ng-switch-when="0">No logs yet.</i>
      <ul ng-switch-default style="border:1px solid black">
        <li ng-repeat="l in $ctrl.logger.logs track by $index">{{ l }}</li>
      </ul>
    </ng-switch>
  `,
  controller: class LogViewerComponent {
    static $inject = ['logger'];
    constructor(public logger: LoggerService) { }
  },
};

export const moduleName = angular.
  module('route3', []).
  directive('route3AngularjsRoot', route3RootDirective).
  component('route3LogViewer', logViewerComponent).
  name;
