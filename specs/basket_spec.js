var basket = require("../basket");
var items = require("../items");
var customer = require("../customer");
var assert = require("assert");

describe("Basket", function() {

  beforeEach(function() {
    basket.contents = [];
    customer.loyaltyStatus = true;
  });

  it("should be empty at start", function() {
    assert.equal(0, basket.contents.length);
  });

  it("can add an item", function() {
    basket.addItem(items[0]);
    assert.equal(1, basket.contents.length);
    assert.equal("milk", basket.contents[0].description);
  });

  it("can remove an item", function() {
    basket.addItem(items[0]);
    basket.addItem(items[0]);
    assert.equal(2, basket.contents.length);
    basket.removeItem(1);
    assert.equal(1, basket.contents.length);
  });

  it("can add multiple items", function() {
    basket.addItems(items);
    assert.equal(9, basket.contents.length);
  });

  it("can empty basket", function() {
    basket.addItems(items);
    assert.equal(9, basket.contents.length);
    basket.empty();
    assert.equal(0, basket.contents.length);
  });

  it("can calculate raw total", function() {
    basket.addItems(items);
    assert.equal(38.12, basket.rawTotal());
  });

  it("can calculate final total, where no discounts apply", function() {
    basket.addItem(items[0]);
    basket.addItem(items[1]);
    basket.addItem(items[2]);
    basket.addItem(items[3]);
    assert.equal(8.35, basket.finalTotal(customer));
  })

  it("can calculate final total after threshold discount only (i.e. where customer does not have a loyalty card", function() {
    customer.loyaltyStatus = false;
    basket.addItems(items);
    assert.equal(34.31, basket.finalTotal(customer));
  });

  it("can calculate final total after loyalty discount (i.e. where customer has a loyalty card", function() {
    basket.addItems(items);
    assert.equal(32.40, basket.finalTotal(customer));
  });

  it("can get bogof items", function() {
    basket.addItems(items);
    assert.equal(5, basket.getBogofItems().length);
  });

  it("can get not-free items", function() {
    basket.addItems(items);
    console.log("Basket contents: ", basket.contents);
    assert.equal(8, basket.removeFreeBogofItems().length);
  });

  it("can calculate final final total", function() {
    basket.addItems(items);
    assert.equal(29.64, basket.finalFinalTotal(customer))
  })
  


});