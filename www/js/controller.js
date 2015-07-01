angular.module('starter.controllers', ['starter.services'])
.controller('MainCtrl', function($scope , SQLService, QuoteService, ListStockService,  $ionicModal, $ionicPopup, $http, $resource) {
    console.log('MainCtrl');
    $scope.quoteList = null;
    $scope.stockList = [];
    
    SQLService.setup();
    
    QuoteService.getdata().success(function (data){
        var result = data.substring(3);
        console.log(result);
        $scope.quoteList=angular.fromJson(result); // as per  emilySmitley Answer which is Working Good
     });
    
    var tempstockList=ListStockService.query();
    tempstockList.$promise.then(function(tempstockList) {
        
        for(var i=0, size = tempstockList.length; i< size; i++){
            var tStock = tempstockList[i];
            console.log(tStock);
            $scope.stockList.push(angular.fromJson(tStock));
        }
    });
    

    $scope.loadQuote = function() {
        SQLService.all().then(function (results) {
            for(var i = 0, size = results.length; i < size ; i++){
                var item = results[i];
                getQuote(item).success(function (data){
                    var result = data.substring(3); // TO eliminate // in beginning
                    console.log(result);
                    angular.forEach(angular.fromJson(result),function(nitem) {
                        $scope.quoteList.push(nitem);
                    });
                });
            }
        });	
    }

    $scope.loadQuote();    
    
    // Create and load the Modal
    $ionicModal.fromTemplateUrl('new-quote.html', {
        scope : $scope
    }).then(function(modal) {
        $scope.modal = modal;
        animation: 'slide-in-up'
    });


    var getQuote = function(quote){
        console.log(quote);
        var url = "http://finance.google.com/finance/info?client=ig&q=NSE:";
        var index2 = quote.quoteName;
        var getURL = url.concat(index2);
        console.log(getURL);
        return $http.get(getURL); 
    }

    var getNewQuote = function(quote){
        console.log(quote);
        SQLService.set(quote.e);
        var url = "http://finance.google.com/finance/info?client=ig&q=NSE:";
        var index2 = quote.e;
        var getURL = url.concat(index2);
        console.log(getURL);
        return $http.get(getURL); 
    }
    
    // Called when the form is submitted
    $scope.createQuote = function(quote) {
        getNewQuote(quote).success(function (data){
            var result = data.substring(3); // TO eliminate // in beginning
            console.log(result);
            angular.forEach(angular.fromJson(result),function(item) {
                $scope.quoteList.push(item);
            });
    });

    $scope.modal.hide();
    };
    
    $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex - 1, 1);
        $scope.items.splice(toIndex, 0, item);
    };

    $scope.onItemDelete = function(quote) {
        $ionicPopup.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this task?'
        }).then(function(res) {
            if(res) {
            SQLService.del(quote);
            $scope.quoteList.splice( $scope.quoteList.indexOf(quote), 1 );
            } 
        });
    };
})
.directive('ionSearch', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                getData: '&source',
                model: '=?',
                search: '=?filter'
            },
            link: function(scope, element, attrs) {
                attrs.minLength = attrs.minLength || 0;
                scope.placeholder = attrs.placeholder || '';
                scope.search = {value: ''};

                if (attrs.class)
                    element.addClass(attrs.class);

                if (attrs.source) {
                    scope.$watch('search.value', function (newValue, oldValue) {
                        if (newValue.length > attrs.minLength) {
                            scope.getData({str: newValue}).then(function (results) {
                                scope.model = results;
                            });
                        } else {
                            scope.model = [];
                        }
                    });
                }

                scope.clearSearch = function() {
                    scope.search.value = '';
                };
            },
            template: '<div class="item-input-wrapper">' +
                        '<i class="icon ion-android-search"></i>' +
                        '<input type="search" placeholder="{{placeholder}}" ng-model="search.value">' +
                        '<i ng-if="search.value.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
                      '</div>'
        };
    });


