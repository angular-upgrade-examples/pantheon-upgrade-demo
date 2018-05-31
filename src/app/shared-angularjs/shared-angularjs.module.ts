import * as angular from 'angular';
import { StateService } from './state.service';

export const moduleName = angular.
  module('shared', []).
  service('state', StateService).
  name;
