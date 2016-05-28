type INode = shift.node.INode;
type INodeType = shift.node.INodeType;
type IHandlerContext = shift.node.IHandlerContext;

export abstract class AbstractHandler {

  public next: AbstractHandler;
  public type: INodeType;

  abstract doHandle(context: IHandlerContext): void;
  abstract destroyFactory(context: IHandlerContext): Function;
  abstract doBuildInputOutput(model: INode);

  handle(context: IHandlerContext): void {
    if (this.check(context.model.type)) {
      this.preHandle(context);

      if (context.model.id.substr(0, 3) === 'TMP') {
        this.doBuildInputOutput(context.model);
      }

      this.doHandle(context);
      // 绑定$destroy
      context.scope.$on('$destroy', this.destroyFactory(context));
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
