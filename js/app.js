const app = angular.module('app', [])
  .controller('appCtrl', ($scope) => {
    $scope.name = 'David';
  })
  .directive('appNav', () => {
    return {
      controllerAs: 'crtl',
      bindToController: true,
      template: `
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <ul class="nav nav-pills">
              <li class="active">
                <a href="/">Home</a>
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
