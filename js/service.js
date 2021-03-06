angular.module('app')
  .service('bing', function($http) {
    return {
      search: (cb) => {
        $http.get('/grabArt').then(({ data }) => {
          console.log(data, 'grab art hit in angular');
          cb(data);
        }, (err) => {
          console.log(err);
        });
      },
      findLikes: (call) => {
        $http.get('/findLikes').then(({ data }) => {
          console.log(data, 'grab stats');
          call(data);
        }, (err) => {
          console.log(err);
        });
      },
    };
  });
