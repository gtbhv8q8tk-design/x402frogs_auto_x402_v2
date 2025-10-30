// api/mint.js

export default function handler(req, res) {
  res.status(402).json({
    x402Version: 1,   // ✅ тепер число, а не рядок
    name: "x402Frogs NFT Mint",
    description: "Pay 1 USDC to mint your frog NFT.",
    icon: "https://ipfs.io/ipfs/QmepBFK4YT8KwB4GNg3pwBdtDJy8kr8RtPgURTBdqt8fV8/1.png",
    accepts: [
      {
        chain: "base",
        token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC Base
        amount: "1000000", // 1 USDC (6 decimals)
        to: "0x1DEf6d9E7ba7256dF17d01Bf7D8FA62d82A27Fc4", // ⚠️ Вкажи тут свою адресу для отримання USDC
        label: "Mint NFT"
      }
    ]
  });
}
