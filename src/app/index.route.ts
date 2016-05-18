/** @ngInject */
export function routerConfig(
  $stateProvider: angular.ui.IStateProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider,
  $locationProvider: angular.ILocationProvider,
  $uiViewScrollProvider: angular.ui.IUiViewScrollProvider) {

  $urlRouterProvider.otherwise('/404');
  $uiViewScrollProvider.useAnchorScroll();
  $locationProvider.html5Mode({
    enabled: true
  });

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('notfound', {
      url: '/404',
      templateUrl: 'app/notfound/notfound.html'
    });
}
