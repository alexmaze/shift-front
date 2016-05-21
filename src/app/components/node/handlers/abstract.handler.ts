import { INodeType } from './../../../models/node.model.ts';
import { IHandlerContext } from '../handlers/handler-context.model.ts';


export abstract class AbstractHandler {

  public next: AbstractHandler;
  public type: INodeType;

  abstract doHandle(context: IHandlerContext): void;

  handle(context: IHandlerContext): void {
    if (this.check(context.model.type)) {
      this.preHandle(context);
      this.doHandle(context);
    } else {
      if (!this.next) {
        throw 'No available handler for: ' + JSON.stringify(context.model.type);
      }
      this.next.handle(context);
    }
  };

  preHandle(context: IHandlerContext) {
    let {elem, instance, model} = context;
    elem.css('top', model.position.y + 'px');
    elem.css('left', model.position.x + 'px');
    elem.addClass('shift-node-' + model.type.primary);
    elem.addClass('shift-node-' + model.type.secondary);
    elem.addClass('shift-node-' + model.type.tertiary);
    instance.draggable(elem);
  }

  check(type: INodeType): boolean {
    if (this.type.primary === type.primary &&
      this.type.secondary === type.secondary &&
      this.type.tertiary === type.tertiary) {
      return true;
    }
    return false;
  }

}
