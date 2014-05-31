var App = angular.module("bidApp", [ "ngAnimate" ]);

const TRUNCATE_AT = 5;
const COLORS = [ "_", "powderblue", "chartreuse", "yellow", "pink", "#eee" ];
const BID_STEP = 50;

App.controller("bidCtrl", function($scope, $http, $timeout) {
  $scope.truncateAt = TRUNCATE_AT;
  $scope.buyerId = 1;
  getUpdates();

  $scope.$watchCollection("bids", function(bids, oldBids) {
    var amount = bids[0].amount;
    $scope.leadingBidAmount = amount;
    $scope.nextBidAmount = amount + BID_STEP;
  });

  $scope.bidColor = function(bid) {
    return COLORS[bid.buyer];
  };

  // Actions

  $scope.placeBid = function() {
    var amount = parseInt($scope.formBidAmount, 10);
    var minAmount = $scope.nextBidAmount;
    amount = amount || minAmount;  // If empty, default.

    $scope.formBidAmount = "";

    if (amount < minAmount) {
      alert("Bid at least " + minAmount);
    } else {
      var postData = { amount: amount, buyer: $scope.buyerId };
      $http.post("/bid.json", postData).success(function(bid) {
        $scope.bids.unshift(bid);
      });
    }
  };

  $scope.showAllBids = function() {
    $scope.truncateAt = 9999;
  };

  // Helpful thingies

  function getUpdates() {
    $http.get("/bids.json").success(function(data) {
      $scope.bids = data;
    });

    // Run this method on an interval. Poor man's websocket.
    $timeout(getUpdates, 2000);
  }
});
