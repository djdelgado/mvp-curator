angular.module('app')
  .controller('imgCtrl', function($http, bing) {
    this.artist = '';
    this.url = '';
    this.grabWork = (work) => {
      console.log(work, 'work');
      this.artist = work.artist;
      this.url = work.image;
    };
    bing.search(this.grabWork);
    console.log(this.artist, "the artist");
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
                <img alt="art" src={{ctrl.url}} />
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
