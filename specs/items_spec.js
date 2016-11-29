var items = require("../items");
var assert = require("assert");

describe("Items", function() {

  it("should have 9 items", function() {
    assert.equal(9, items.length);
  });

  it("item should have a description", function() {
    assert.equal("milk", items[0].description);
  });

  it("item should have a price", function() {
    assert.equal(1.50, items[1].price);
  });

  it("item should have a bogof status", function() {
    assert.equal(false, items[4].bogofStatus);
  });
});