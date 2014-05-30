var bidApp = angular.module("bidApp", [ "ngAnimate" ]);

const initiallyTruncateAt = 5;
const colors = [ "_", "powderblue", "chartreuse", "yellow", "pink", "#eee" ];

bidApp.controller("bidCtrl", function($scope, $http, $timeout) {
  $scope.truncateAt = initiallyTruncateAt;
  $scope.colors = colors;
  $scope.buyerId = 1;

  getUpdates();

  $scope.placeBid = function() {
    var amount = parseInt($scope.formBidAmount, 10);
    var minAmount = $scope.nextBidAmount();
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

  $scope.leadingBidAmount = function() {
    if (!$scope.bids) return;
    return $scope.bids[0].amount;
  };

  $scope.nextBidAmount = function() {
    var leading = $scope.leadingBidAmount();
    if (!leading) return;

    return leading + 50;
  };

  function getUpdates() {
    $http.get("/bids.json").success(function(data) {
      $scope.bids = data;
    });

    // Effectively, run this method once a second.
    // Poor man's websocket.
    $timeout(getUpdates, 1000);
  }
});
