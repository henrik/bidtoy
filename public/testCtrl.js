var testApp = angular.module("testApp", [ "ngAnimate", "timer" ]);

var bids = [
  { amount: 400, buyer: 1, color: "powderblue", reserve_met: true, time: "2014-05-01 12:02" },
  { amount: 350, buyer: 2, color: "chartreuse", reserve_met: false, time: "2014-05-01 12:01" },
  { amount: 300, buyer: 1, color: "powderblue", reserve_met: false, time: "2014-05-01 12:00" },
];

var initiallyTruncateAt = 5;

testApp.controller("testCtrl", function($scope) {
  $scope.truncateAt = initiallyTruncateAt;

  $scope.bids = bids;
  $scope.newBidAmount = 450;
  $scope.leadingBidAmount = 400;
  $scope.endTime = new Date().getTime() + (1000 * 60 * 5);

  $scope.placeBid = function() {
    var amount = $scope.newBidAmount;

    var bid = {
      amount: amount,
      buyer: 2,
      color: "chartreuse",
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
