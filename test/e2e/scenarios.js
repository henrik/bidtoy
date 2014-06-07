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

    var field = element(by.model("formBidAmount"));
    field.sendKeys("12345");
    element(by.css("button")).click();

    expect(leadingBidAmount.getText()).toContain("12 345");
  });
});
