angular.module('starter.controllers', [])
.controller('MainCtrl', function($scope ,QuoteService, $ionicModal, $http) {
    console.log('MainCtrl');
    $scope.quoteList= null;

    QuoteService.getdata().success(function (data){
        var result = data.substring(3);

        console.log(result);
        $scope.quoteList=angular.fromJson(result); // as per  emilySmitley Answer which is Working Good
     });

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('new-quote.html', {
        scope : $scope
    }).then(function(modal) {
        $scope.modal = modal;
        animation: 'slide-in-up'
    });

   
    var getNewQuote = function(quote){
        console.log(quote);
        var url = "http://finance.google.com/finance/info?client=ig&q=NSE:";
//        var index1 = "INDEXBOM:".concat(quote.e);
        var index2 = quote.e;
        var getURL = url.concat(index2);
        console.log(getURL);
        return $http.get(getURL); 
//        return $http.get("http://finance.google.com/finance/info?client=ig&q=NSE:ITC"); 
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
});
