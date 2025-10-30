// Простий захист від повторного використання
let usedTxs = [];

export default async function handler(req, res) {
  try {
    const { txHash, id } = req.body;

    if (!txHash || !id) {
      return res.status(400).json({ error: "txHash and id are required" });
    }

    // Перевірка на повторне використання
    if (usedTxs.includes(txHash)) {
      return res.status(400).json({ error: "Transaction already used" });
    }

    // TODO: тут треба додати реальну перевірку USDC-транзакції в Base chain
    // (через ethers.js або API від Alchemy / Infura)

    // Позначаємо, що цей txHash вже використаний
    usedTxs.push(txHash);

    return res.status(200).json({
      success: true,
      message: "Payment verified. NFT will be minted soon."
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
