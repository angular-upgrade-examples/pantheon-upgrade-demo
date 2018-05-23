import * as angular from 'angular';
import { TextUtilsService } from '../text-utils.service';

const route4RootDirective: angular.IDirectiveFactory = () => ({
  restrict: 'A',
  template: '<h3>{{ $ctrl.subtitle }}</h3>',
  controllerAs: '$ctrl',
  controller: class Route4RootController {
    subtitle = this.textUtils.toLowerCase('Powered by AngularJS');

    constructor(private textUtils: TextUtilsService) { }
  },
});

export const moduleName = angular.
  module('route4', []).
  directive('route4AngularjsRoot', route4RootDirective).
  name;
