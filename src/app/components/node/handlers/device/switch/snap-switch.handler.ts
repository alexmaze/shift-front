import { AbstractHandler } from './../../abstract.handler.ts';
import { INodeType, INode } from './../../../../../models/node.model.ts';
import { IHandlerContext } from '../../../handlers/handler-context.model.ts';

export class SnapSwitchHandler extends AbstractHandler {

  public next: AbstractHandler;
  public type: INodeType;

  constructor() {
    super();

    this.type = {
      primary: 'device',
      secondary: 'switch',
      tertiary: 'snap'
    };
  }

  doBuildInputOutput(model: INode) {
    // console.debug('build input output');
    model.outputs = [
      {
        port: 0,
        value: undefined,
        valueType: 'boolean'
      }
    ];
  }

  doHandle(context: IHandlerContext): void {

    let { logger } = context;
    logger.debug('handler and node');

    this.addEndPoints(context);
  }

  addEndPoints(context: IHandlerContext) {
    let { instance, elem, model } = context;
    // output port 1
    instance.addEndpoint(elem, {
      uuid: model.id + '-output-0',
      anchor: [0.9, 0.60, 0, 0],
      cssClass: 'NodePort',
      endpoint: 'Dot',
      maxConnections: -1,
      isSource: true,
      isTarget: false
    });
  }

}
