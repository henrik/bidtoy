var App = angular.module("bidApp", [ "ngAnimate" ]);

const COLORS = [ "_", "powderblue", "chartreuse", "yellow", "pink", "#eee" ];
const TRUNCATE_AT = 5;
const BID_STEP = 50;

App.controller("bidCtrl", function($scope, $http, $timeout) {
  $scope.buyerId = 1;
  $scope.truncationEnabled = true;
  getUpdates();

  $scope.$watchCollection("bids", function(bids, oldBids) {
    var amount = bids[0].amount;
    $scope.leadingBidAmount = amount;
    $scope.nextBidAmount = amount + BID_STEP;

    // Replacing a single record with a "show all" link is silly, so:
    // 5 records = show all
    // 6 records = show all
    // 7 records = show 5, hide 2
    // 8 records = show 5, hide 3
    // etc
    $scope.truncateAt = bids.length <= TRUNCATE_AT + 1 ? TRUNCATE_AT + 1 : TRUNCATE_AT;
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
    $scope.truncationEnabled = false;
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
