import { NodeHandlerService } from './handlers/handler.service.ts';

type INode = shift.node.INode;

interface IShiftNodeScope extends angular.IScope {
  shiftNodeModel: INode;
  shiftNodeJsplumb: any;
  shiftNodeActions: {
    onEdit: (node: INode) => void;
    onDelete: (node: INode) => void;
  };
  onDrop: Function;
  menuOptions: any;
  order: any;
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
      shiftNodeJsplumb: '=',
      shiftNodeActions: '='
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

      // 右键菜单
      scope.menuOptions = [
        ['Edit', () => {
          scope.shiftNodeActions.onEdit(scope.shiftNodeModel);
        }],
        ['Delete', () => {
          scope.shiftNodeActions.onDelete(scope.shiftNodeModel);
        }]
      ];

      scope.order = 'type';

    }
  };
}
