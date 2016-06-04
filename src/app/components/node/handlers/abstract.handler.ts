type INode = shift.node.INode;
type INodeType = shift.node.INodeType;
type IHandlerContext = shift.node.IHandlerContext;

export abstract class AbstractHandler {

  public next: AbstractHandler;
  public type: INodeType;

  /**
   * 子类实现，个性化处理函数
   */
  abstract doHandle(context: IHandlerContext): void;
  /**
   * 子类实现，节点销毁时会调用
   */
  abstract destroyFactory(context: IHandlerContext): Function;
  /**
   * 子类实现，对于新建的节点，构造其空输入输出
   */
  abstract doBuildInputOutput(model: INode);

  /**
   * 默认处理函数，禁止子类重载
   */
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

  /**
   * 默认预处理函数，禁止子类重载
   */
  preHandle(context: IHandlerContext) {
    let {elem, instance, model} = context;
    elem.css('top', model.position.y + 'px');
    elem.css('left', model.position.x + 'px');
    elem.addClass('shift-node-' + model.type.primary);
    elem.addClass('shift-node-' + model.type.secondary);
    elem.addClass('shift-node-' + model.type.tertiary);
    instance.draggable(elem);
  }

  /**
   * 默认检查是否匹配函数，禁止子类重载
   */
  check(type: INodeType): boolean {
    if (this.type.primary === type.primary &&
      this.type.secondary === type.secondary &&
      this.type.tertiary === type.tertiary) {
      return true;
    }
    return false;
  }

}
