'use strict';

export class WorkController {

  public title: string;

  /* @ngInject */
  constructor(
    private $log: angular.ILogService) {
      this.title = 'haha';
  }


}
