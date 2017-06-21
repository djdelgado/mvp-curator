angular.module('app')
  .controller('catCtrl', ($http, bing) => {
    this.statistics;
    this.getLikes = (stats) => {
      this.statistics = stats;
    };
    bing.findLikes(this.getLike);
  })
  .directive('catalogue', () => {
    return {
      controller: 'catCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      template: `
        <div ng-controller="catCtrl" class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-6">
                            <table class="table">
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
                                    <tr class="success">
                                        <td>
                                            {{ likes }}
                                        </td>
                                        <td>
                                            {{ artist }}
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
