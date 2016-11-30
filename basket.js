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
  },
  removeFreeBogofItems: function() {
    var copyItems = this.contents.slice();
    console.log("copyItems:", copyItems);
    var notFreeItems = [];
    var freeItems = [];

    while ( copyItems.length > 0 ) {
      var currentItem = copyItems[0];
      console.log("In outer outer if loop; currentItem is ", currentItem);
      notFreeItems.push(currentItem);
      copyItems.shift();

      if ( currentItem.bogofStatus === true ) {
        for ( var item of copyItems ) {
          var index = copyItems.indexOf(item);
          if ( item.description === currentItem.description ) {
              freeItems.push(item);
              copyItems.splice(index, 1);
          }
        }
      }
    }
    console.log("At end of function.");
    console.log("freeItems: ", freeItems);
    console.log("notFreeItems: ", notFreeItems);
    return notFreeItems;
  }, 
  bogofRawTotal: function() {
    var bogoffedContents = this.removeFreeBogofItems();
    var total = 0;
    for (var item of bogoffedContents) {
      total += item.price;
    }
    return total;
  }, 
  finalFinalTotal: function(customer) {
    var total = this.bogofRawTotal();
    if ( total > 20 && !customer.loyaltyStatus ) {
      total = (total / 100) * 90;
    };
    if ( total > 20 && customer.loyaltyStatus ) {
      total = (total / 100) * 85;
    };
    total = Math.round(total * 100) / 100;
    return total;
  }
};

basket.addItems(items);
console.log("Basket contents", basket.contents);
basket.removeFreeBogofItems();

module.exports = basket;