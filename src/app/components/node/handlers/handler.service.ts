import { AbstractHandler } from './abstract.handler.ts';

import { AndHandler } from './virtual/logic/and.handler.ts';
import { OrHandler } from './virtual/logic/or.handler.ts';
import { NotHandler } from './virtual/logic/not.handler.ts';
import { ConditionalHandler } from './virtual/logic/conditional.handler.ts';


import { ArithmeticHandler } from './virtual/operator/arithmetic.handler.ts';
import { BitwizeHandler } from './virtual/operator/bitwise.handler.ts';
import { CompoundHandler } from './virtual/operator/compound.handler.ts';


import { SnapSwitchHandler } from './device/switch/snap-switch.handler.ts';

type IHandlerContext = shift.node.IHandlerContext;

export class NodeHandlerService {

  public first: AbstractHandler;
  public last: AbstractHandler;

  constructor() {
    this.newHandler(new AndHandler())
        .newHandler(new OrHandler())
        .newHandler(new NotHandler())
        .newHandler(new ConditionalHandler())

        .newHandler(new ArithmeticHandler())
        .newHandler(new BitwizeHandler())
        .newHandler(new CompoundHandler())

        .newHandler(new SnapSwitchHandler())
        ;
  }

  handle(context: IHandlerContext) {
    if (!this.first) {
      throw 'No available handler for: ' + JSON.stringify(context.model.type);
    }
    this.first.handle(context);
  }

  newHandler(newHandler: AbstractHandler) {
    if (this.first === undefined) {
      this.first = newHandler;
      this.first.next = this.last;
    } else if (this.last === undefined) {
      this.last = newHandler;
      this.first.next = this.last;
    } else {
      this.last.next = newHandler;
      this.last = newHandler;
    }
    return this;
  }
}
