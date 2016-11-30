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
  getFreeBogofItems: function() {
    var bogofItems = this.getBogofItems();
    console.log("bogofItems:", bogofItems);
    var notFreeItems = [];
    var freeItems = [];

    while ( bogofItems.length > 0 ) {
      var currentItem = bogofItems[0];
      console.log("In while loop; currentItem is ", currentItem);
      notFreeItems.push(currentItem);
      bogofItems.shift();
      var counter = 1;

      for ( var item of bogofItems ) {
        var index = bogofItems.indexOf(item);
        if ( item.description === currentItem.description ) {
          counter++;
          console.log("In outer if statement; counter is ", counter);
          if ( counter % 2 === 0 ) {
            console.log("In inner if statement; counter is ", counter);
            freeItems.push(item);
            bogofItems.splice(index, 1);
          }
          if ( counter % 2 === 1 ) {
            console.log("In inner if statement; counter is ", counter);
            notFreeItems.push(item);
            bogofItems.splice(index, 1);
          }
        }
      }
    }
    console.log("At end of function.");
    console.log("freeItems: ", freeItems);
    console.log("notFreeItems: ", notFreeItems);
    return freeItems;
  }
};

basket.addItems(items);
console.log("Basket contents", basket.contents);
basket.getFreeBogofItems();

module.exports = basket;