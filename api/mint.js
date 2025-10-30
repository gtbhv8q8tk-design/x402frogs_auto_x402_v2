export default function handler(req, res) {
  res.status(402).json({
    x402Version: 1,
    resources: [
      {
        id: "1",
        title: "Mint Frog NFT",
        description: "Pay 1 USDC to mint a Frog NFT",
        media: "https://ipfs.io/ipfs/QmepBFK4YT8KwB4GNg3pwBdtDJy8kr8RtPgURTBdqt8fV8/1.png",
        accepts: [
          {
            chain: "base",
            currency: "USDC",
            amount: "1000000", // 1 USDC = 1_000_000 (6 decimals)
            receiver: "0x63AcAd363c60178e0153268a272876197770bFEf"
          }
        ]
      }
    ]
  });
}
