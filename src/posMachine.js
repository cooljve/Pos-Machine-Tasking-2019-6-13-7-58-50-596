function printReceipt(barcodes,allItems) {
    try {
        var orderedItemsWithCount = findItems(barcodes, allItems);
        var prices = computePrice(orderedItemsWithCount);
        var receipts = createReceipt(prices, orderedItemsWithCount);
    } catch (e) {
        var err='[ERROR]:';
        return err+e;
    }
    return receipts;
}

function findItems(barcodes, allItems) {
    var orderedItems = [];
    for (var item of allItems) {
        item['count'] = 0;
        for (var barcode of barcodes) {
            if (item.id == barcode) {
                if (orderedItems.indexOf(item)>-1) {
                    orderedItems.splice(orderedItems.indexOf(item), 1);
                }
                item['count']++;
                orderedItems.push(item);
            }
        }
    }
    return orderedItems;
}

function computePrice(orderedItems) {
    var sum = 0;
    for (item of orderedItems) {
        sum += item.price*item.count;
    }
    return sum;
}

function createReceipt(price,orderedItemsWithCount){
    var receipts;
    receipts='Receipts\n' +
        '------------------------------------------------------------\n';
    for (var item of orderedItemsWithCount) {
        receipts += '\t'+item.name + '\t\t\t' + item.price + '\t' + item.count + '\n';
    }
    receipts+='------------------------------------------------------------\n'+
        'Price: '+price;
    return receipts;
}

module.exports = {
    printReceipt, computePrice, findItems,createReceipt,
};