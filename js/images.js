angular.module('app')
  .controller('imgCtrl', function($http, bing) {
    // $scope.atrists = ['van gogh', 'salvador dali', 'rembrant'];
    // $scope.artwork = '';
    // $scope.grabImg = (url) => {
    //   $scope.artwork = url;
    // };
    console.log("in image controller")
    // bing.search('van gogh');
    // this.likeClick = () => {
    //   console.log("it clicked")
    //   $http.put('/like').then((data) => {
    //     console.log(data);  
    //   }, (err) => {
    //     console.log(err);
    //   });
    // };

  })
  .directive('imageView', function() {
    return {
      controllerAs: 'ctrl',
      controller: 'imgCtrl',
      bindToController: true,
      template: `
      <div ng-controller="imgCtrl" class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <img alt="artwork" src="https://tse3.mm.bing.net/th?id=OIP.K7UEgKixROvjQ2wR7lXZRAEsDl&pid=Api" />
                <div class="btn-group btn-group-lg">
            
                <button ng-click="ctrl.likeClick()" class="btn btn-default" type="button">
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
