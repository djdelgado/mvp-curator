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
      findLikes: (cb) => {
        $http.get('/findLikes').then(({ data }) => {
          console.log(data, 'grab stats');
          cb(data);
        }, (err) => {
          console.log(err);
        });
      },
    };
  });
