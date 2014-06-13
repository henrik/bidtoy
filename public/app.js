const COLORS = [ "_", "powderblue", "chartreuse", "yellow", "pink", "#eee" ];
const TRUNCATE_AT = 5;
const BID_STEP = 50;

var App = angular.module("bidApp", [ "ngAnimate" ]);

App.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});

App.service("BidService", function($http) {
  this.get = function() {
    return $http.get("/bids.json");
  };

  this.post = function(data) {
    return $http.post("/bid.json", data);
  };
});

App.controller("bidCtrl", function($scope, $interval, $location, BidService) {
  $location.search("location-changed-from-angular");

  $scope.buyerId = 1;
  $scope.truncationEnabled = true;

  getUpdates();
  // Run this method on an interval. Poor man's websocket.
  $interval(getUpdates, 2000);

  $scope.$watch("bids", function(bids, oldBids) {
    if (!bids) return;

    var amount = bids[0].amount;

    $scope.leadingBidAmount = amount;
    $scope.nextBidAmount = amount + BID_STEP;

    // Replacing a single record with a "show all" link is silly, so:
    // 5 records = show all
    // 6 records = show all
    // 7 records = show 5, hide 2
    // 8 records = show 5, hide 3
    // etc
    $scope.truncateAt = bids.length === TRUNCATE_AT + 1 ? TRUNCATE_AT + 1 : TRUNCATE_AT;
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
      BidService.post(postData).success(function(bid) {
        $scope.bids.unshift(bid);
      });
    }
  };

  $scope.showAllBids = function() {
    $scope.truncationEnabled = false;
  };

  // Helpful thingies

  function getUpdates() {
    BidService.get().success(function(bids) {
      $scope.bids = bids;
    });
  }
});
