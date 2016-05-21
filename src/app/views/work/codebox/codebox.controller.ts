'use strict';

export class CodeboxController {

  public aceOption: any;
  public aceModel: any;

  /* @ngInject */
  constructor(private $log: angular.ILogService,
    private $interval: angular.IIntervalService) {

    this.aceOption = {

      useWrapMode : true,
      showGutter: false,
      theme: 'monokai',
      mode: 'javascript',
      wrap: true
    };

    let codeArr = [];
    codeArr.push('var Sketchpad = require(\'Shift.Sketchpad\');\n');
    codeArr.push('function WorkBench() {\n');
    codeArr.push('  this.init();\n');
    codeArr.push('  this.showcase = new Showcase();\n');
    codeArr.push('  this.codebox = new CodeBox();\n');
    codeArr.push('  this.sketchpad = new Sketchpad();\n}\n');
    this.aceModel = codeArr.join('');

  }

  deploy() {
    this.$log.debug('Deploy Code!~');
  }

}
