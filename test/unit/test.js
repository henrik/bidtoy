describe("BidService", function() {
  beforeEach(angular.mock.module("bidApp"));

  it("can get a list of bids", function() {
    inject(function(BidService, $httpBackend) {
      $httpBackend.
        expect("GET", "/bids.json").
        respond([ "bid1", "bid2" ]);

      BidService.get().success(function(data) {
        expect(data).toEqual([ "bid1", "bid2" ]);
      });

      $httpBackend.flush();
    });
  });
});

describe("bidCtrl", function() {
  beforeEach(angular.mock.module("bidApp"));

  var $scope;
  beforeEach(inject(function($controller, $rootScope) {
    $scope = $rootScope.$new();
    $controller("bidCtrl", { "$scope": $scope });
  }));

  it("sets reasonable defaults", function() {
    expect($scope.buyerId).toEqual(1);
  });

  it("can tell you the bidColor", function() {
    var bid1a = { buyer: 1 },
        bid1b = { buyer: 1 },
        bid2  = { buyer: 2 };

    expect($scope.bidColor(bid1a)).toEqual("powderblue");
    expect($scope.bidColor(bid1b)).toEqual("powderblue");
    expect($scope.bidColor(bid2)).toEqual("chartreuse");
  });
});
