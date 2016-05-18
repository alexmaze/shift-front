
export class MainController {

  /* @ngInject */
  constructor (private toastr: any) {
    this.toastr = toastr;
  }

  sayHello() {
    this.toastr.info('Hello Alex!');
  }
}
