var testApp = angular.module("testApp", [ "ngAnimate" ]);

var bids = [
  { amount: 400, buyer: 1, reserve_met: true, time: "2014-05-01 12:02" },
  { amount: 350, buyer: 2, reserve_met: false, time: "2014-05-01 12:01" },
  { amount: 300, buyer: 1, reserve_met: false, time: "2014-05-01 12:00" },
];

var initiallyTruncateAt = 5;
var colors = [ "_", "powderblue", "chartreuse", "yellow", "pink", "green", "red" ];

testApp.controller("testCtrl", function($scope) {
  $scope.truncateAt = initiallyTruncateAt;

  $scope.colors = colors;
  $scope.bids = bids;
  $scope.buyerId = 1;
  $scope.newBidAmount = 450;
  $scope.leadingBidAmount = 400;

  $scope.placeBid = function() {
    var amount = $scope.newBidAmount;

    var bid = {
      amount: amount,
      buyer: $scope.buyerId,
      reserve_met: true,
      time: "2014-05-01 12:03",
    }
    $scope.bids.unshift(bid);

    $scope.leadingBidAmount = amount;
    $scope.newBidAmount = amount + 50;
  };

  $scope.showAllBids = function() {
    $scope.truncateAt = 9999;
  };
});
