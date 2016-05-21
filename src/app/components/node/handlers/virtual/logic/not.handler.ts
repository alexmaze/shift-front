import { AbstractHandler } from './../../abstract.handler.ts';
import { INodeType } from './../../../../../models/node.model.ts';
import { IHandlerContext } from '../../../handlers/handler-context.model.ts';

export class NotHandler extends AbstractHandler {

  public next: AbstractHandler;
  public type: INodeType;

  constructor() {
    super();

    this.type = {
      primary: 'virtual',
      secondary: 'logic',
      tertiary: 'not'
    };
  }

  doHandle(context: IHandlerContext): void {
    let { logger } = context;
    logger.debug('handler not node');

    this.addEndPoints(context);
  }

  addEndPoints(context: IHandlerContext) {
    let { instance, elem, model } = context;

    // input port 1
    instance.addEndpoint(elem[0], {
      uuid: model.id + '-in-0',
      anchor: [0.1, 0.7, 0, 0],
      cssClass: 'NodePort',
      endpoint: 'Dot',
      maxConnections: -1,
      isSource: false,
      isTarget: true
    });
    // output port 1
    instance.addEndpoint(elem[0], {
      uuid: model.id + '-out-0',
      anchor: [0.9, 0.7, 0, 0],
      cssClass: 'NodePort',
      endpoint: 'Dot',
      maxConnections: -1,
      isSource: true,
      isTarget: false
    });

  }

}
