// api/mint.js

export default function handler(req, res) {
  res.status(402).json({
    x402Version: 1,
    name: "x402Frogs NFT Mint",
    description: "Pay 1 USDC on Base to mint your frog NFT.",
    icon: "https://ipfs.io/ipfs/QmepBFK4YT8KwB4GNg3pwBdtDJy8kr8RtPgURTBdqt8fV8/1.png",
    accepts: [
      {
        id: "mint1", 
        chain: "base",
        token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC (Base)
        amount: 1000000, // 1 USDC (6 decimals)
        to: "0x1def6d9e7ba7256df17d01bf7d8fa62d82a27fc4", // ⚠️ заміни на свою адресу
        label: "Mint Frog NFT"
      }
    ]
  });
}
