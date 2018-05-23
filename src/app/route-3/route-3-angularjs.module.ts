import * as angular from 'angular';
import { TextUtilsService } from '../shared/text-utils.service';

const route3RootDirective: angular.IDirectiveFactory = () => ({
  restrict: 'A',
  template: '<h3>{{ $ctrl.subtitle }}</h3>',
  controllerAs: '$ctrl',
  controller: class Route3RootController {
    static $inject = ['textUtils'];
    subtitle = this.textUtils.toUpperCase('Powered by AngularJS');

    constructor(private textUtils: TextUtilsService) { }
  },
});

export const moduleName = angular.
  module('route3', []).
  directive('route3AngularjsRoot', route3RootDirective).
  name;
