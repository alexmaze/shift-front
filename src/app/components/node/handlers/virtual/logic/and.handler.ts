import { AbstractHandler } from './../../abstract.handler.ts';
import { INode, INodeType } from './../../../../../models/node.model.ts';
import { IHandlerContext } from '../../../handlers/handler-context.model.ts';

export class AndHandler extends AbstractHandler {

  public next: AbstractHandler;
  public type: INodeType;

  constructor() {
    super();

    this.type = {
      primary: 'virtual',
      secondary: 'logic',
      tertiary: 'and'
    };
  }

  doHandle(context: IHandlerContext): void {
    context.logger.debug('AND:', context);
  }

}
