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
