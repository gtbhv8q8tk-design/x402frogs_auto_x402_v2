require('dotenv').config();
const { ethers } = require('ethers');
const { isTxProcessed, recordTx } = require('../lib/sales');

const ERC20_ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.json({
  x402Version: 1,
  id: "offer-1",
  status: "success",
  mintTx: receiptMint.transactionHash
});
    }

    const { txHash, buyer } = req.body;
    if (!txHash || !buyer) {
      return res.status(400).json({
        x402Version: 1,
        id: "offer-1",
        status: "error",
        error: "txHash and buyer required"
      });
    }

    if (isTxProcessed(txHash)) {
      return res.status(409).json({
        x402Version: 1,
        id: "offer-1",
        status: "error",
        error: "Transaction already processed"
      });
    }

    const provider = new ethers.providers.JsonRpcProvider(process.env.BASE_RPC);
    const receipt = await provider.getTransactionReceipt(txHash);
    if (!receipt) {
      return res.status(400).json({
        x402Version: 1,
        id: "offer-1",
        status: "error",
        error: "Transaction not found"
      });
    }

    // Перевірка USDC переказу
    const iface = new ethers.utils.Interface(ERC20_ABI);
    let paid = false;
    for (const log of receipt.logs) {
      if (log.address.toLowerCase() === process.env.USDC_ADDRESS.toLowerCase()) {
        try {
          const parsed = iface.parseLog(log);
          if (parsed.name === "Transfer") {
            if (
              parsed.args[1].toLowerCase() === process.env.TREASURY.toLowerCase() &&
              parsed.args[2].gte(1_000_000) // 1 USDC (6 decimals)
            ) {
              paid = true;
              break;
            }
          }
        } catch {}
      }
    }

    if (!paid) {
      return res.status(402).json({
        x402Version: 1,
        id: "offer-1",
        status: "error",
        error: "Payment not detected"
      });
    }

    // Мінт
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const collection = new ethers.Contract(
      process.env.COLLECTION_ADDRESS,
      ["function mintFor(address to, uint256 id, uint256 amount, bytes data) external"],
      signer
    );
    const tx = await collection.mintFor(buyer, 1, 1, "0x");
    const receiptMint = await tx.wait();

    recordTx(txHash);

    return res.json({
      x402Version: 1,
      id: "offer-1",
      status: "success",
      mintTx: receiptMint.transactionHash
    });
  } catch (err) {
    return res.status(500).json({
      x402Version: 1,
      id: "offer-1",
      status: "error",
      error: err.message
    });
  }
};

