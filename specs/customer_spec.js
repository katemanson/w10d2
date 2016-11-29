var customer = require("../customer");
var assert = require("assert");

describe("Customer", function() {

  it("should have a name", function() {
    assert.equal("Jeff", customer.name);
  });

  it("should have a wallet amount", function() {
    assert.equal(40.00, customer.wallet);
  });

  it("should have a loyalty card status", function() {
    assert.equal(true, customer.loyaltyStatus);
  });



});