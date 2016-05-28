
/* @ngInject */
export function rightClick(
  $document: angular.IDocumentService,
  $rootScope: angular.IRootScopeService,
  $log: angular.ILogService,
  $parse: angular.IParseService) {

  return {
    restrict: 'A',
    scope: {
      rightClick: '&'
    },
    link: function (scope: any, element: any, attr: any) {
      console.log(scope.rightClick);
      element.bind('contextmenu', (event: any) => {
        event.preventDefault();
        scope.rightClick();
      });
    }
  };

}
