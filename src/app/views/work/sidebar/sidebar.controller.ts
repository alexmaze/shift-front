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
      primaryLabel: first.label,
      secondary: second.key,
      secondaryLabel: second.label,
      tertiary: third.key,
      tertiaryLabel: third.label
    };
  }

  onDragSuccess(event: any, index: number, data: INodeType) {
    this.$log.debug('drag success');
  }

}
