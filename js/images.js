angular.module('app')
  .directive('imageView', (bing) => {
    return {
      scope: {

      },
      controller: ($scope) => {
        $scope.atrists = ['van gogh', 'salvador dali', 'rembrant'];
        $scope.artwork = '';
        $scope.grabImg = (url) => {
          $scope.artwork = url;
        };
        bing.search('van gogh');
      },
      controllerAs: 'ctrl',
      bindToController: true,
      template: `
      <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <img alt="artwork" src="https://tse3.mm.bing.net/th?id=OIP.K7UEgKixROvjQ2wR7lXZRAEsDl&pid=Api" />
                <div class="btn-group btn-group-lg">
                
                <button class="btn btn-default" type="button">
                    <em class="glyphicon glyphicon-thumbs-up"></em> I Like!
                </button> 
                <button class="btn btn-default" type="button">
                    <em class="glyphicon glyphicon-thumbs-down"></em> It's Ok
                </button> 
                </div>
            </div>
            </div>
        </div>
      `,
    };
  });
