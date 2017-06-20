const app = angular.module('app', [])
  .controller('appCtrl', ($scope, $http) => {
    $scope.username = 'admin';
    $http.get('/userTag').then(({ data }) => {
      $scope.username = data;
    }, (err) => {
      console.log(err);
    });
  })
  .directive('appNav', () => {
    return {
      controllerAs: 'crtl',
      controller: 'appCtrl',
      bindToController: true,
      template: `
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <ul class="nav nav-pills">
              <li class="active">
                <a href="/">{{ username }}</a>
              </li>
              <li>
                <a href="#">Catalogue</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      `,
    };
  });
