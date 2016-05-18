/// <reference path="../../typings/main.d.ts" />

import { config } from './index.config.ts';
import { routerConfig } from './index.route.ts';
import { runBlock } from './index.run.ts';

import { MainController } from './main/main.controller.ts';

import { WorkController } from './work/work.controller.ts';
import { SidebarController } from './work/sidebar/sidebar.controller.ts';
import { SketchpadController } from './work/sketchpad/sketchpad.controller.ts';
import { CodeboxController } from './work/codebox/codebox.controller.ts';

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

    .controller('WorkController', WorkController)
    .controller('SidebarController', SidebarController)
    .controller('SketchpadController', SketchpadController)
    .controller('CodeboxController', CodeboxController)
    ;
}
