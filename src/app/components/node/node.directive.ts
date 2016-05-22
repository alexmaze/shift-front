import { INode } from './../../models/node.model.ts';
import { NodeHandlerService } from './node-handler.service.ts';

interface IShiftNodeScope extends angular.IScope {
  shiftNodeModel: INode;
  shiftNodeJsplumb: any;
  onDrop: Function;
}

/* @ngInject */
export function shiftNode(
  $document: angular.IDocumentService,
  $rootScope: angular.IRootScopeService,
  $log: angular.ILogService,
  nodeHandlerService: NodeHandlerService) {

  return {
    restrict: 'E',
    scope: {
      shiftNodeModel: '=',
      shiftNodeJsplumb: '='
    },
    templateUrl: 'app/components/node/node.template.html',
    link: function (scope: IShiftNodeScope, element: any, attr: any) {
      // $log.debug(scope.shiftNodeModel);

      let elem = element.find('.shift-node');

      // 设置
      nodeHandlerService.handle({
        elem: elem,
        model: scope.shiftNodeModel,
        instance: scope.shiftNodeJsplumb,
        logger: $log,
        scope: scope
      });

    }
  };
}
