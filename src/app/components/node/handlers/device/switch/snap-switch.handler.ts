import { AbstractHandler } from './../../abstract.handler.ts';

type INode = shift.node.INode;
type INodeType = shift.node.INodeType;
type IHandlerContext = shift.node.IHandlerContext;

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
    this.extraRender(context);
  }

  destroyFactory(context: IHandlerContext): Function {
    return (event: any) => {
      context.logger.debug('destroy snap switch', context, event);

      // 解绑额外添加的事件
      context.elem.find('.content').unbind('click');

      context.instance.remove(context.elem);
    };
  }

  extraRender(context: IHandlerContext) {
    // 点击切换图片
    setTimeout(() => {

      let { elem } = context;
      elem.find('.content').bind('click', () => {
        elem.toggleClass('on');
      });
    }, 0);
    // console.log('hello');
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
