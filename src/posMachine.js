function printReceipt(barcodes, allItems) {
    if (isValid(barcodes, allItems)) {
      let orderedItemsWithCount = findItems(barcodes, allItems);
      let prices = calculateTotalPrice(orderedItemsWithCount);
      var receipts = createReceipt(prices, orderedItemsWithCount);
    }else{
      receipts='[ERROR]:The barcodes are not valid.';
    }
  return receipts;
}

function isValid(barcodes,allItems) {
  let itemIds=[];
  for(let item of allItems){
    itemIds.push(item.id);
  }
  for(let barcode of barcodes){
    if (itemIds.indexOf(barcode) == -1) {
      return false;
    }
  }
  return true;
}

function findItems(barcodes, allItems) {
  let orderedItems = [];
  for (let item of allItems) {
    item['count'] = 0;
    for (let barcode of barcodes) {
      if (item.id == barcode) {
        if (orderedItems.indexOf(item) > -1) {
          orderedItems.splice(orderedItems.indexOf(item), 1);
        }
        item['count']++;
        orderedItems.push(item);
      }
    }
  }
  return orderedItems;
}

function calculateTotalPrice(orderedItems) {
  let sum = 0;
  for (item of orderedItems) {
    sum += item.price * item.count;
  }
  return sum;
}

function createReceipt(price, orderedItemsWithCount) {
  let receipts;
  receipts = 'Receipts\n' +
      '------------------------------------------------------------\n';
  for (let item of orderedItemsWithCount) {
    receipts += '\t' + item.name + '\t\t\t' + item.price + '\t' + item.count + '\n';
  }
  receipts += '------------------------------------------------------------\n' +
      'Price: ' + price;
  return receipts;
}

module.exports = {
  printReceipt, calculateTotalPrice, findItems, createReceipt,isValid
};