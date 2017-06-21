angular.module('app')
  .controller('imgCtrl', function($http, bing) {
    this.artist = '';
    this.url = '';
    this.grabWork = (work) => {
      this.artist = work.artist;
      this.url = work.image;
    };

    bing.search(this.grabWork);

    this.likeClick = () => {
      console.log("it clicked")
      $http.post('/like', { artist: this.artist }).then((data) => {
        console.log(data, 'the like data');
        bing.search(this.grabWork);
      }, (err) => {
        console.log(err);
      });
    };

    this.unlikeClick = () => {
      bing.search(this.grabWork);
    };
  })
  .directive('imageView', function() {
    return {
      controllerAs: 'ctrl',
      controller: 'imgCtrl',
      bindToController: true,
      template: `
      <div ng-controller="imgCtrl" class="container-fluid">
        <div class="text-center" class="row">
            <div class="rounded mx-auto d-block" class="col-md-12">
                <img class="img-responsive" alt="art" src={{ctrl.url}} />
                <div class="btn-group btn-group-lg">
            
                <button ng-click="ctrl.likeClick()" class="btn btn-default" type="button">
                    <em class="glyphicon glyphicon-thumbs-up"></em> I Like!
                </button>
           
                <button ng-click="ctrl.unlikeClick()" class="btn btn-default" type="button">
                    <em class="glyphicon glyphicon-thumbs-down"></em> It's Ok
                </button> 
                
                </div>
            </div>
            </div>
        </div>
      `,
    };
  });
