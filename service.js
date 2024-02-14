app.service('ProductService', [
    '$http',
    function ($http) {
      this.getProducts = function () {
        return $http.get('https://fakestoreapi.com/products');
      };
    },
  ]);
  