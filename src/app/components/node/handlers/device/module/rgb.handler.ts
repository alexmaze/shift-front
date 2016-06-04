import { AbstractHandler } from './../../abstract.handler.ts';

type INode = shift.node.INode;
type INodeType = shift.node.INodeType;
type IHandlerContext = shift.node.IHandlerContext;

export class RgbModuleHandler extends AbstractHandler {

  public next: AbstractHandler;
  public type: INodeType;

  constructor() {
    super();

    this.type = {
      primary: 'device',
      secondary: 'module',
      tertiary: 'rgb'
    };
  }

  doBuildInputOutput(model: INode) {
    // console.debug('build input output');
    // 默认选中 color section
    model.inputs = [
      {
        port: 'on',
        valueType: 'boolean',
        _label: 'On'
      }, {
        port: 'color',
        type: 'const',    // 此选项只能为固定值
        constValue: false, // 选中即开启
        valueType: 'boolean',
        _label: 'Color',
        sub: [
          {
            port: 'r',
            type: 'const',
            constValue: 255,
            valueType: 'number',
            _label: 'R'
          }, {
            port: 'g',
            type: 'const',
            constValue: 255,
            valueType: 'number',
            _label: 'G'
          }, {
            port: 'b',
            type: 'const',
            constValue: 255,
            valueType: 'number',
            _label: 'B'
          }
        ]
      }, {
        port: 'intensitywave',
        type: 'const',
        constValue: false,
        valueType: 'boolean',
        _label: 'Intensity wave',
        sub: [
          {
            port: 'rate',
            type: 'const',
            constValue: 50,
            valueType: 'number',
            _label: 'rate'
          }, {
            port: 'velocity',
            type: 'const',
            constValue: 5,
            valueType: 'number',
            _label: 'velocity'
          }
        ]
      }, {
        port: 'multicolorwave',
        type: 'const',
        constValue: false,
        valueType: 'boolean',
        _label: 'Multicolor wave',
        sub: [
          {
            port: 'rate',
            type: 'const',
            constValue: 50,
            valueType: 'number',
            _label: 'rate'
          }, {
            port: 'velocity',
            type: 'const',
            constValue: 5,
            valueType: 'number',
            _label: 'velocity'
          }
        ]
      }, {
        port: 'blink',
        type: 'const',
        constValue: false,
        valueType: 'boolean',
        _label: 'Blink',
        sub: [
          {
            port: 'frequency',
            type: 'const',
            constValue: 10,
            valueType: 'number',
            _label: 'frequency'
          }
        ]
      }, {
        port: 'gradient',
        type: 'const',
        constValue: true,
        valueType: 'boolean',
        _label: 'Gradient',
        sub: [
          {
            port: 'r',
            type: 'const',
            constValue: 255,
            valueType: 'number',
            _label: 'R'
          }, {
            port: 'g',
            type: 'const',
            constValue: 255,
            valueType: 'number',
            _label: 'G'
          }, {
            port: 'b',
            type: 'const',
            constValue: 255,
            valueType: 'number',
            _label: 'B'
          }, {
            port: 'min',
            type: 'const',
            constValue: 0,
            valueType: 'number',
            _label: 'min'
          }, {
            port: 'max',
            type: 'const',
            constValue: 200,
            valueType: 'number',
            _label: 'max'
          }, {
            port: 'velocity',
            type: 'const',
            constValue: 5,
            valueType: 'number',
            _label: 'velocity'
          }
        ]
      }, {
        port: 'multicolorblink',
        type: 'const',
        constValue: false,
        valueType: 'boolean',
        _label: 'Multicolor blink',
        sub: [
          {
            port: 'amount',
            type: 'const',
            constValue: 3,
            valueType: 'number',
            _label: 'amount'
          }, {
            port: 'frequency',
            type: 'const',
            constValue: 10,
            valueType: 'number',
            _label: 'frequency'
          }
        ]
      }, {
        port: 'multicolorgradient',
        type: 'const',
        constValue: false,
        valueType: 'boolean',
        _label: 'Multicolor gradient',
        sub: [
          {
            port: 'min',
            type: 'const',
            constValue: 0,
            valueType: 'number',
            _label: 'min'
          }, {
            port: 'max',
            type: 'const',
            constValue: 200,
            valueType: 'number',
            _label: 'max'
          }, {
            port: 'velocity',
            type: 'const',
            constValue: 5,
            valueType: 'number',
            _label: 'velocity'
          }
        ]
      }
    ];
  }

  doHandle(context: IHandlerContext): void {
    let { logger } = context;
    logger.debug('handler and node');

    setTimeout(() => {
      this.addStaticEndPoints(context);
      this.extraRender(context);
    }, 0);
    setTimeout(() => {
      this.addDynamicEndPoints(context);
    }, 0);
  }

  destroyFactory(context: IHandlerContext): Function {
    return (event: any) => {
      context.logger.debug('destroy snap switch', context, event);

      // 解绑额外添加的事件
      context.elem.find('.example').unbind('click');

      context.instance.remove(context.elem);
    };
  }

  extraRender(context: IHandlerContext) {
    setTimeout(() => {
      // 绘制示例图
      let { elem } = context;
      elem.find('.example').bind('click', () => {
        elem.find('.example').toggleClass('on');
      });
      // 绑定选项卡事件
      context.scope.selectSubInput = (input: shift.node.INodeInput) => {
        context.logger.debug('input section seleted:', input);
        // update model
        let activeInput = this.getActiveSubInput(context);
        activeInput.constValue = false;
        input.constValue = true;

        let oldSubElem = elem.find('.input-' + activeInput.port + ' .sub')[0];
        // update endpoints
        debugger;
        context.instance.remove($(oldSubElem));
        setTimeout(() => {
          // debugger;
          this.addDynamicEndPoints(context);
          // this.addStaticEndPoints(context);
        }, 0);
      }
    });
  }

  addStaticEndPoints(context: IHandlerContext) {
    let { instance, elem, model } = context;

    // input port on
    let subElem = elem.find('.input-on .main')[0];
    instance.addEndpoint(subElem, {
      uuid: model.id + '-input-on',
      anchor: [0.03, 0.45, 0, 0],
      cssClass: 'NodePort',
      endpoint: 'Dot',
      maxConnections: -1,
      isSource: false,
      isTarget: true
    });

  }
  addDynamicEndPoints(context: IHandlerContext) {
    let { instance, elem, model } = context;
    // add sub inputs
    let activeInput = this.getActiveSubInput(context);
    let subElem = elem.find('.input-' + activeInput.port + ' .sub')[0];

    let startPos = 0.5;
    for (let sub of activeInput.sub) {
      let x = instance.addEndpoint(subElem, {
        uuid: model.id + '-input-' + activeInput.port + '-' + sub.port,
        anchor: [0.03, startPos, 0, 0],
        cssClass: 'NodePort',
        endpoint: 'Dot',
        maxConnections: -1,
        isSource: false,
        isTarget: true
      });
      // debugger;
      startPos += 1;
    }
  }

  private getActiveSubInput(context: IHandlerContext) {
    for (let input of context.model.inputs) {
      if (input.sub && input.sub.length > 0 && input.constValue) {
        return input;
      }
    }
    throw new Error('can not find active sub input');
  }

}
