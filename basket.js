var items = require("./items");
var items = require("./customer");

var basket = {
  contents: [],
  addItem: function(item) {
    this.contents.push(item);
  },
  removeItem: function(index) {
    this.contents.splice(index, 1);
  },
  addItems: function(items) {
    this.contents.push.apply(this.contents, items);
  },
  empty: function() {
    this.contents.splice(0, this.contents.length);
  },
  rawTotal: function() {
    var total = 0;
    for (var item of this.contents) {
      total += item.price;
    }
    return total;
  }, 
  finalTotal: function(customer) {
    var total = this.rawTotal();
    if ( total > 20 && !customer.loyaltyStatus ) {
      total = (total / 100) * 90;
    };
    if ( total > 20 && customer.loyaltyStatus ) {
      total = (total / 100) * 85;
    };
    total = Math.round(total * 100) / 100;
    return total;
  },
  getBogofItems: function() {
    var bogofItems = [];
    for ( var item of this.contents ) {
      if ( item.bogofStatus ) {
        bogofItems.push(item);
      }
    }
    return bogofItems;
  }
  getFreeItems: function() {
    var freeItems = [];
    var notFreeItems = [];
    for ( var item of this.bogofItems() ) {

    }
  }
};

module.exports = basket;