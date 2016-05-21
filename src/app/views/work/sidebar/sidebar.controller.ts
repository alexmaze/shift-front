'use strict';

import { INodeType } from './../../../models/node.model.ts';
import { INodeTypeLeaf } from './../../../components/node-types/node-types-tree.const.ts';

export class SidebarController {

  /* @ngInject */
  constructor(
    private $log: angular.ILogService,
    private NODE_TYPES_TREE: any) {
    // this.$log.debug(NODE_TYPES_TREE);
  }

  getNodeType(first: INodeTypeLeaf, second: INodeTypeLeaf, third: INodeTypeLeaf): INodeType {
    return {
      primary: first.key,
      secondary: second.key,
      tertiary: third.key
    }
  }

  onDragSuccess(event, index, data) {
    this.$log.debug('drag success');
  }

}
