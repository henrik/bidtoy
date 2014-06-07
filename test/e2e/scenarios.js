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
    var field = element(by.model("formBidAmount"));
    field.sendKeys("12345");
    element(by.css("button")).click();
    // No expectation yet - was tricky to get that working.
  });
});
