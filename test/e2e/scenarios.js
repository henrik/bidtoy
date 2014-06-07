// This is a horrible test, because it expects your dev app to be running
// and runs against that, sharing its database.

describe("Bid app", function() {
  var ptor;

  beforeEach(function() {
    browser.get("http://localhost:9292");
    ptor = protractor.getInstance();
  });

  it("changes the URL", function() {
    expect(ptor.getCurrentUrl()).toContain("location-changed-from-angular");
  });

  it("lets you bid", function() {
    var leadingBidAmount = element(by.binding("leadingBidAmount"));
    var bids = element.all(by.repeater("bid in bids"));

    // If this is false, restart the Sinatra app.
    // TODO: Some API request to reset its state? And a separate instance for test that's not shared with dev?
    expect(bids.count()).toBe(3);

    var field = element(by.model("formBidAmount"));
    field.sendKeys("12345\n");

    expect(leadingBidAmount.getText()).toContain("12 345");
    expect(bids.count()).toBe(4);
  });
});
