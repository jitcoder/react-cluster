'use strict';

/** Description **
 *  Just generates a ton of data to be used for testing purposes
 * /

/** depencies */
const randomName = require('random-name');
const randomInt = require('random-int');
const fs = require('fs');

/** config */
const products = [
  require('./configs/AlienJerky'),
  require('./configs/MindHelmet'),
  require('./configs/PlasmaCanister'),
  require('./configs/ReptillianRepellent'),
];

const states = require('./configs/States');

const numberOfRows = 1000;
const outputDirectory = 'data/';
const productsFile = 'products.json';
const salesFile = 'sales.json';

const transactionStatuses = [
  'processing',
  'awaiting_payment',
  'shipped',
  'delivered',
  'lost',
  'canceled',
];

const streetNames = [
  'blv',
  'street',
  'ave',
  'drv',
  'ccl',
  'rd',
  'way',
];

const cityNames = [
  'Ville',
  'City',
  'Town',
  'Park',
  'Village',
  '',
];

/** Globals */
let count = 0;
const productIds = [];

/** functions */

const generateRow = function() {
  const randomProduct = randomInt(productIds.length - 1);
  const randomStatus = randomInt(transactionStatuses.length - 1);
  const randomStreet = randomInt(streetNames.length - 1);
  const randomState = randomInt(states.length - 1);
  const randomCity = randomInt(cityNames.length - 1);
  const randomZip = randomInt(10000, 99999);
  count += 1;

  return {
    ID: count,
    PRODUCT_ID: products[randomProduct].id,
    STATUS: transactionStatuses[randomStatus],
    DATE_PURCHASED: randomInt(Date.now() - 31540000 * 2, Date.now()),
    SHIPPING_ADDRESS: `${randomInt(100, 10000)} ${randomName.last()} ${streetNames[randomStreet]}, ${randomName.last()} ${cityNames[randomCity]}, ${states[randomState].abbreviation}, ${randomZip}`,
  }
};

/** main */

const main = function() {
  const data = [];
  console.log(`Generating ${numberOfRows} rows of data...`);
  while(data.length < numberOfRows) {
    data.push(generateRow());
  }
  fs.writeFileSync(`${outputDirectory}${salesFile}`, JSON.stringify(data, null, 2));
  fs.writeFileSync(`${outputDirectory}${productsFile}`, JSON.stringify(products, null, 2));
  console.log('DONE!');
};

main();
