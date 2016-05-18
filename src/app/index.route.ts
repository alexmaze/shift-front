/** @ngInject */
export function routerConfig(
  $stateProvider: angular.ui.IStateProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider,
  $locationProvider: angular.ILocationProvider,
  $uiViewScrollProvider: angular.ui.IUiViewScrollProvider) {

  // $urlRouterProvider.otherwise('/404');
  $urlRouterProvider.otherwise('/work');
  $uiViewScrollProvider.useAnchorScroll();
  $locationProvider.html5Mode({
    enabled: true
  });

  $stateProvider
    .state('work', {
      url: '/work',
      templateUrl: 'app/work/work.html',
      controller: 'WorkController',
      controllerAs: 'work'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('notfound', {
      url: '/404',
      templateUrl: 'app/notfound/notfound.html'
    });
}
