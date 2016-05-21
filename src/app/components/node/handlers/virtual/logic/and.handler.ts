import { AbstractHandler } from './../../abstract.handler.ts';
import { INodeType, INode } from './../../../../../models/node.model.ts';
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


  doBuildInputOutput(model: INode) {
    // console.debug('build input output');
    model.inputs = [
      {
        port: 0,
        type: undefined,
        refId: undefined,
        refOutputPort: undefined,
        constValue: undefined,
        value: undefined,
        valueType: 'boolean',
        sub: undefined
      },
      {
        port: 1,
        type: undefined,
        refId: undefined,
        refOutputPort: undefined,
        constValue: undefined,
        value: undefined,
        valueType: 'boolean',
        sub: undefined
      }
    ];
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

    // input port 1
    instance.addEndpoint(elem, {
      uuid: model.id + '-input-0',
      anchor: [0.1, 0.56, 0, 0],
      cssClass: 'NodePort',
      endpoint: 'Dot',
      maxConnections: -1,
      isSource: false,
      isTarget: true
    });
    // input port 2
    instance.addEndpoint(elem, {
      uuid: model.id + '-input-1',
      anchor: [0.1, 0.76, 0, 0],
      cssClass: 'NodePort',
      endpoint: 'Dot',
      maxConnections: -1,
      isSource: false,
      isTarget: true
    });
    // output port 1
    instance.addEndpoint(elem, {
      uuid: model.id + '-output-0',
      anchor: [0.9, 0.56, 0, 0],
      cssClass: 'NodePort',
      endpoint: 'Dot',
      maxConnections: -1,
      isSource: true,
      isTarget: false
    });
  }

}
