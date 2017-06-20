angular.module('app', [])
  .controller('appCtrl', () => {

  })
  .directive('profile', () => {
    return {
      templateUrl: '../public/profile.html',
    };
  });
