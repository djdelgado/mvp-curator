angular.module('app')
  .service('bing', ($http) => {
    return {
      search: (query, cb) => {
        const obj = {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.KEY,
          },
          q: 'Basquiat',
        };
        $http.get('https://api.cognitive.microsoft.com/bing/v5.0/images/search', {
          params: {
            q: obj.q,
            max: 5,
          },
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.KEY,
          },
        }).then(function success({ data }) {
          console.log(data.value[0], 'data');
        //   cb(data.items);
        }, function error(err) {
          console.log(err, 'ERROR');
        });
      },
    };
  });
