angular.module('app')
  .service('bing', function($http) {
    return {
      search: function(query, cb) {
        console.log("Helooo search")
        let req = {
          method: 'GET',
          url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search',
          data: {
            q: 'van gogh',
          },
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.KEY,
          },
        };
        $http(req).then(function success (data) {
          console.log(data.value[0], 'data');
        //   cb(data.items);
        }, function error (err) {
          console.log(err, 'ERROR');
        });
      },
    };
  });
