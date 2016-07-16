'use strict';

import { INodeTypeLeaf } from './node-types-tree.const.ts';

type INodeType = shift.node.INodeType;

export class SidebarController {

  userInfo: {
    name: string;
    avatarUrl: string;
  };
  currentTab: string = 'toolbox';
  filter: string;

  /* @ngInject */
  constructor(
    private $log: angular.ILogService,
    private NODE_TYPES_TREE: any) {
    // this.$log.debug(NODE_TYPES_TREE);

    this.userInfo = {
      name: 'Fred',
      avatarUrl: 'assets/images/avatar.png'
    };
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
    // this.$log.debug('drag success');
  }

}
