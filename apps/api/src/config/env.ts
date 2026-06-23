import "dotenv/config";

export const env = {
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  blockfrostApiKey: process.env.BLOCKFROST_API_KEY ?? "",
  cardanoNetwork: (process.env.CARDANO_NETWORK ?? "Preprod") as "Preprod" | "Mainnet",
  cardanoMnemonic: process.env.CARDANO_MNEMONIC ?? "",
  cardanoMockMint: process.env.CARDANO_MOCK_MINT !== "false",
};