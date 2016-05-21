'use strict';

export class SketchpadController {

  /* @ngInject */
  constructor(
    private $log: angular.ILogService) {
  }

  onDrop(event, data) {
    this.$log.debug(event, data);
  }

}
