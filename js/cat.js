angular.module('app')
  .controller('catCtrl', ($scope, $http, bing) => {
    $scope.statistics = [];
    this.getLikes = (stats) => {
        console.log(stats, "my stats")
      stats.forEach((obj, i, arr) => {
        $scope.statistics.push(obj);
      });
    };
    bing.findLikes(this.getLikes);
  })
  .directive('catalogue', () => {
    return {
      scope: {
        stats: '<',
      },
      controller: 'catCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      template: `
        <div ng-controller="catCtrl" class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-6">
                            <table  class="table">
                                <thead>
                                    <tr>
                                        <th>
                                            #likes
                                        </th>
                                        <th>
                                            Artist
                                        </th>
                                    </tr>
                                </thead>
                                 <tbody>
                                    <tr ng-repeat="st in statistics" class="success">
                                        <td>
                                            {{ st.likes }}
                                        </td>
                                        <td>
                                            {{ st.artist }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-6">
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
    };
  });
