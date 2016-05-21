'use strict';
import { INodeType } from './../../../models/node.model.ts';

export class SketchpadController {

  /* @ngInject */
  constructor(
    private $log: angular.ILogService) {
  }

  onDrop(event: any, data: INodeType) {
    this.$log.debug(event, data);
  }

}
