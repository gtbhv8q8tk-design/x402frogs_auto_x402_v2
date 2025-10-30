require('dotenv').config();

module.exports = async (req, res) => {
  const publicUrl = process.env.PUBLIC_URL || `https://${req.headers.host}`;

  const payload = {
    x402Version: 1,              // ✅ число, а не рядок
    type: "x402",
    chainId: 8453,               // Base Mainnet
    payment: {
      currency: "USDC",
      tokenAddress: process.env.USDC_ADDRESS,
      amount: "1",
      receiver: process.env.TREASURY
    },
    resource: `${publicUrl}/api/mint?id=1`,
    metadata: {
      name: "x402frogs #1",
      description: "Mint x402frogs collectible for 1 USDC",
      image: "https://ipfs.io/ipfs/QmepBFK4YT8KwB4GNg3pwBdtDJy8kr8RtPgURTBdqt8fV8/1.png"
    }
  };

  return res.status(402).json(payload);
};
