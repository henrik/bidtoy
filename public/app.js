var bidApp = angular.module("bidApp", [ "ngAnimate" ]);

var initiallyTruncateAt = 5;
var colors = [ "_", "powderblue", "chartreuse", "yellow", "pink", "#eee" ];

bidApp.controller("bidCtrl", function($scope, $http) {
  $scope.truncateAt = initiallyTruncateAt;
  $scope.colors = colors;

  $http.get("/bids.json").success(function(data) {
    $scope.bids = data;
    setLeadingBidAmount(data[0].amount);
  });

  $scope.buyerId = 1;

  $scope.placeBid = function() {
    var amount = parseInt($scope.formBidAmount, 10);
    var minAmount = $scope.nextBidAmount;

    if (amount < minAmount) {
      alert("Bid at least " + minAmount);
      $scope.formBidAmount = minAmount;
    } else {
      var bid = {
        amount: amount,
        buyer: $scope.buyerId,
        reserve_met: true,
        time: "2014-05-01 12:03",
      }
      $scope.bids.unshift(bid);

      setLeadingBidAmount(amount);
    }
  };

  $scope.showAllBids = function() {
    $scope.truncateAt = 9999;
  };

  function setLeadingBidAmount(leadingAmount) {
    $scope.leadingBidAmount = leadingAmount;
    $scope.nextBidAmount = leadingAmount + 50;
    $scope.formBidAmount = $scope.nextBidAmount;
  }
});
