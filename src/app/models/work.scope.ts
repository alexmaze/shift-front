import { INode } from './node.model.ts';

export interface IWorkScope extends angular.IScope {
  model: INode[];
}
