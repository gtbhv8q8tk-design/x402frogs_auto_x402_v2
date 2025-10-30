const fs = require('fs');
const path = require('path');
const salesPath = path.join(__dirname, '..', 'data', 'sales.json');

function isTxProcessed(txHash) {
  if (!fs.existsSync(salesPath)) return false;
  try {
    const arr = JSON.parse(fs.readFileSync(salesPath, 'utf8'));
    return arr.includes(txHash);
  } catch (e) {
    return false;
  }
}

function recordTx(txHash) {
  let arr = [];
  if (fs.existsSync(salesPath)) {
    try {
      arr = JSON.parse(fs.readFileSync(salesPath, 'utf8'));
    } catch (e) { arr = []; }
  }
  arr.push(txHash);
  fs.writeFileSync(salesPath, JSON.stringify(arr, null, 2));
}

module.exports = { isTxProcessed, recordTx };
