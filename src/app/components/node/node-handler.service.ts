import { AbstractHandler } from './handlers/abstract.handler.ts';
import { IHandlerContext } from './handlers/handler-context.model.ts';

import { AndHandler } from './handlers/virtual/logic/and.handler.ts';
import { OrHandler } from './handlers/virtual/logic/or.handler.ts';
import { NotHandler } from './handlers/virtual/logic/not.handler.ts';
import { ConditionalHandler } from './handlers/virtual/logic/conditional.handler.ts';


export class NodeHandlerService {

  public first: AbstractHandler;
  public last: AbstractHandler;

  constructor() {
    this.newHandler(new AndHandler())
        .newHandler(new OrHandler())
        .newHandler(new NotHandler())
        .newHandler(new ConditionalHandler())
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
