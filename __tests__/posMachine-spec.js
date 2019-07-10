const posMachine = require('../src/posMachine');

const allItems = [
  {"id": "0001", "name": "Coca Cola", "price": 3},
  {"id": "0002", "name": "Diet Coke", "price": 4},
  {"id": "0003", "name": "Pepsi-Cola", "price": 5},
  {"id": "0004", "name": "Mountain Dew", "price": 6},
  {"id": "0005", "name": "Dr Pepper", "price": 7},
  {"id": "0006", "name": "Sprite", "price": 8},
  {"id": "0007", "name": "Diet Pepsi", "price": 9},
  {"id": "0008", "name": "Diet Mountain Dew", "price": 10},
  {"id": "0009", "name": "Diet Dr Pepper", "price": 11},
  {"id": "0010", "name": "Fanta", "price": 12}
];

it('should return the sum of items\'price when invoke computePrice given specify items', () => {
  //give
  const items = [
    {"count": 2, "id": "0001", "name": "Coca Cola", "price": 3},
    {"count": 1, "id": "0002", "name": "Diet Coke", "price": 4},
    {"count": 1, "id": "0003", "name": "Pepsi-Cola", "price": 5}];
  //when
  const price = posMachine.calculateTotalPrice(items);
  //then
  expect(price).toBe(15);
});

it('should return false when invoke isValid given barcodes 01', () => {
  //give
  const barcodes = ['01'];
  //when
  const flag = posMachine.isValid(barcodes,allItems);
  //then
  expect(flag).toBe(false);
});

it('should return true when invoke isValid given barcodes 0001 0003 0005 0003', () => {
  //give
  const barcodes = ['0001', '0003', '0005', '0003'];
  //when
  const flag = posMachine.isValid(barcodes,allItems);
  //then
  expect(flag).toBe(true);
});

it('should return items with count when invoke findItems given item 0001 0001 0002 0003', () => {
  //give
  const items = ['0001', '0001', '0002', '0003'];
  //when
  const orderedItemsWithCount = posMachine.findItems(items, allItems);
  //then
  expect(orderedItemsWithCount).toStrictEqual([
    {"count": 2, "id": "0001", "name": "Coca Cola", "price": 3},
    {"count": 1, "id": "0002", "name": "Diet Coke", "price": 4},
    {"count": 1, "id": "0003", "name": "Pepsi-Cola", "price": 5}]);
});

it('should return receipts when invoke createReceipt given item 0001 0001 0002 0003', () => {
  //give
  const items = [
    {"count": 2, "id": "0001", "name": "Coca Cola", "price": 3},
    {"count": 1, "id": "0002", "name": "Diet Coke", "price": 4},
    {"count": 1, "id": "0003", "name": "Pepsi-Cola", "price": 5}];
  //when
  const receipts = posMachine.createReceipt(15, items);
  //then
  expect(receipts).toEqual(
      'Receipts\n' +
      '------------------------------------------------------------\n' +
      '\tCoca Cola\t\t\t3\t2\n' +
      '\tDiet Coke\t\t\t4\t1\n' +
      '\tPepsi-Cola\t\t\t5\t1\n' +
      '------------------------------------------------------------\n' +
      'Price: 15');
});

it('should return receipts when invoke printReceipt given item 0001 0003 0005 0003', () => {
  //give
  const barcodes = ['0001', '0003', '0005', '0003'];
  //when
  const receipts = posMachine.printReceipt(barcodes, allItems);
  //then
  expect(receipts).toEqual(
      'Receipts\n' +
      '------------------------------------------------------------\n' +
      '\tCoca Cola\t\t\t3\t1\n' +
      '\tPepsi-Cola\t\t\t5\t2\n' +
      '\tDr Pepper\t\t\t7\t1\n' +
      '------------------------------------------------------------\n' +
      'Price: 20');
});

it('should return Error message when invoke printReceipt given item 001 03 0005 0003', () => {
  //give
  const barcodes = ['001', '03', '0005', '0003'];
  //when
  const receipts = posMachine.printReceipt(barcodes, allItems);
  //then
  expect(receipts).toEqual('[ERROR]:The barcodes are not valid.');
});