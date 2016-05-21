'use strict';
import { INode } from './../../models/node.model.ts';
import { IWorkScope } from './../../models/work.scope.ts';

export class WorkController {

  public model: INode[];

  /* @ngInject */
  constructor(
    private $log: angular.ILogService,
    private $scope: IWorkScope) {

    this.model = [];
    $scope.model = this.model;

    $scope.$on('deploy', () => {
      this.$log.log(this.model);
    });
  }

}
