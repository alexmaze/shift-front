import { INode } from './../../../models/node.model.ts';

export interface IHandlerContext {
  elem: any;
  model: INode;
  instance: any;
  logger: angular.ILogService;
}
