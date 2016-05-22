'use strict';
import { INode } from './../../models/node.model.ts';
import { IWorkScope } from './../../models/work.scope.ts';
import { ApiService } from './../../components/api/api.service.ts';

declare let window: { workScope: any };

export class WorkController {

  public model: INode[];

  /* @ngInject */
  constructor(
    private $log: angular.ILogService,
    private $scope: IWorkScope,
    private apiService: ApiService) {

    this.model = [];
    $scope.model = this.model;

    // todo 测试专用
    window.workScope = $scope;

    $scope.$on('deploy', () => {
      // todo 先重新获取位置！！！
      this.$log.log(this.model);
      apiService.project_deploy( { nodes: this.model } )
        .success((data: any) => {
          this.$log.debug(data);
        });
    });
  }

}
