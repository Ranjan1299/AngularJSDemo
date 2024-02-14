var app = angular.module('myApp', ['ngRoute']);

// ngRoute configuration for SPA (Search and Products tabs)

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'search.html',
            controller: 'SearchController',
        })
        .when('/products', {
            templateUrl: 'products.html',
            controller: 'ProductController',
        })
        .otherwise({
            redirectTo: '/products'
        });
});

// Search Controller 

app.controller('SearchController', [
    '$scope',
    'ProductService',
    function ($scope, ProductService) {
        $scope.searchQuery = '';
        $scope.searchResults = [];
        $scope.showNotFoundMessage = false;
        $scope.allProducts = []; // Variable to store all products

        // Fetch products once when the controller initializes
        ProductService.getProducts()
            .then(function (response) {
                $scope.products = response.data;
                $scope.allProducts = response.data;
            })
            .catch(function (error) {
                console.log('Error fetching products:', error);
            });

        $scope.searchProducts = function () {
            $scope.searchResults = $scope.allProducts.filter(function (product) {
                return product.title.toLowerCase().includes($scope.searchQuery.toLowerCase());
            });

            // If no search results found, set showNotFoundMessage flag to true
            $scope.showNotFoundMessage = $scope.searchResults.length === 0;
        };
    },
]);

// Product Controller 

app.controller('ProductController', [
    '$scope',
    'ProductService',
    function ($scope, ProductService) {
    $scope.products = [];
    
    ProductService.getProducts()
        .then(function (response) {
            $scope.products = response.data;
        })
        .catch(function (error) {
            console.error('Error fetching products:', error);
        });
}
]);
