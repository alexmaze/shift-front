'use strict';

export class SidebarController {

  /* @ngInject */
  constructor(
    private $log: angular.ILogService,
    private NODE_TYPES_TREE) {
    this.$log.debug(NODE_TYPES_TREE);
  }

}
