import { INode } from './../../models/node.model.ts';

interface IShiftNodeScope extends angular.IScope {
  shiftNodeModel: INode;
  shiftNodeJsplumb: any;
}

/* @ngInject */
export function shiftNode(
  $document: angular.IDocumentService,
  $rootScope: angular.IRootScopeService,
  $log: angular.ILogService) {

  return {
    restrict: 'E',
    scope: {
      shiftNodeModel: '=',
      shiftNodeJsplumb: '='
    },
    templateUrl: 'app/components/node/node.template.html',
    link: function (scope: IShiftNodeScope, element: any, attr: any) {
      $log.debug(scope.shiftNodeModel);


      // 设置样式
      let elem = element.find('.shift-node');
      elem.css('top', scope.shiftNodeModel.position.y + 'px');
      elem.css('left', scope.shiftNodeModel.position.x + 'px');

      let model = scope.shiftNodeModel;
      elem.addClass('shift-node-' + model.type.primary);
      elem.addClass('shift-node-' + model.type.secondary);
      elem.addClass('shift-node-' + model.type.tertiary);

      // 设置拖动
      let instance = scope.shiftNodeJsplumb;
      instance.draggable(elem);


    }
  };
}
