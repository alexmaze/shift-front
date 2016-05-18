/// <reference path="../../typings/main.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';

declare var malarkey: any;
declare var moment: moment.MomentStatic;

module shiftFront {
  'use strict';

  let depns = ['ngAnimate',
               'ngCookies',
               'ngTouch',
               'ngSanitize',
               'ngMessages',
               'ngAria',
               'ngResource',
               'ui.router',
               'ui.bootstrap',
               'toastr'];

  angular.module('shiftFront', depns)
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .controller('MainController', MainController)
    ;
}
