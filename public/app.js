var bidApp = angular.module("bidApp", [ "ngAnimate" ]);

var bids = [
  { amount: 400, buyer: 1, reserve_met: true, time: "2014-05-01 12:02" },
  { amount: 350, buyer: 2, reserve_met: false, time: "2014-05-01 12:01" },
  { amount: 300, buyer: 1, reserve_met: false, time: "2014-05-01 12:00" },
];

var initiallyTruncateAt = 5;
var colors = [ "_", "powderblue", "chartreuse", "yellow", "pink", "#eee" ];

bidApp.controller("bidCtrl", function($scope) {
  $scope.truncateAt = initiallyTruncateAt;

  $scope.colors = colors;
  $scope.bids = bids;
  $scope.buyerId = 1;

  $scope.nextBidAmount = 450;
  $scope.formBidAmount = $scope.nextBidAmount;

  $scope.placeBid = function() {
    var amount = $scope.formBidAmount;
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

      $scope.nextBidAmount = amount + 50;
      $scope.formBidAmount = $scope.nextBidAmount;
    }
  };

  $scope.showAllBids = function() {
    $scope.truncateAt = 9999;
  };
});
