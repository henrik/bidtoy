describe("Bid app", function() {
  var ptor;

  beforeEach(function() {
    browser.get("http://localhost:9292");
    ptor = protractor.getInstance();
  });

  it("changes the URL", function() {
    expect(ptor.getCurrentUrl()).toContain("location-changed-from-angular");
  });
});
