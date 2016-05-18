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
      views: {
        '': {
          templateUrl: 'app/work/work.html',
          controller: 'WorkController',
          controllerAs: 'work',
        },
        'sidebar@work': {
          templateUrl: 'app/work/sidebar/sidebar.html',
          controller: 'SidebarController',
          controllerAs: 'sidebar'
        },
        'sketchpad@work': {
          templateUrl: 'app/work/sketchpad/sketchpad.html',
          controller: 'SketchpadController',
          controllerAs: 'sketchpad'
        },
        'codebox@work': {
          templateUrl: 'app/work/codebox/codebox.html',
          controller: 'CodeboxController',
          controllerAs: 'codebox'
        }
      }
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
