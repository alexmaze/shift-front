import { AbstractHandler } from './../../abstract.handler.ts';
import { INode, INodeType } from './../../../../../models/node.model.ts';
import { IHandlerContext } from '../../../handlers/handler-context.model.ts';

export class OrHandler extends AbstractHandler {

  public next: AbstractHandler;
  public type: INodeType;

  constructor() {
    super();

    this.type = {
      primary: 'virtual',
      secondary: 'logic',
      tertiary: 'or'
    };
  }

  doHandle(context: IHandlerContext): void {
    context.logger.debug('OR:', context);
  }

}
