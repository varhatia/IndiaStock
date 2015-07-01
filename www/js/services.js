var service = angular.module('starter.services', ['ngResource']);

service.factory('QuoteService', function($http){
    return {
        getdata: function(){
              return $http.get('http://finance.google.com/finance/info?client=ig&q=INDEXBOM:SENSEX,NSE:NIFTY'); // You Have to give Correct Url either Local path or api etc 
        }
    };
});
service.factory('ListStockService', function ($resource) {
              return $resource('http://127.0.0.1:5000/listNSEStocks'); // You Have to give Correct Url either Local path or api etc 
});

function getDummyData() {
    return [{
        "id": 0,
        "name": "Atkinson Jenkins"
    },
    {
        "id": 1,
        "name": "Kent Cook"
    },
    {
        "id": 2,
        "name": "Sandoval Kramer"
    },
    {
        "id": 3,
        "name": "Adrienne Rutledge"
    },
    {
        "id": 4,
        "name": "Ebony Bryant"
    },
    {
        "id": 5,
        "name": "Amalia Bernard"
    },
    {
        "id": 6,
        "name": "Faulkner Lang"
    },
    {
        "id": 7,
        "name": "Foley Pickett"
    },
    {
        "id": 8,
        "name": "Lenore Jarvis"
    },
    {
        "id": 9,
        "name": "Marisa Frazier"
    },
    {
        "id": 10,
        "name": "Kristine Johns"
    },
    {
        "id": 11,
        "name": "Burnett Stokes"
    },
    {
        "id": 12,
        "name": "Lucille Fowler"
    },
    {
        "id": 13,
        "name": "Pollard Clark"
    },
    {
        "id": 14,
        "name": "Vega Hendrix"
    },
    {
        "id": 15,
        "name": "Jones Ortega"
    }]
}
