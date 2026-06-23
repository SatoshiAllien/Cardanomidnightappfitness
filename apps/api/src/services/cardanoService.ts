import { env } from "../config/env.js";

export interface BadgeMetadata {
  name: string;
  description: string;
  image: string;
  mediaType: string;
  attributes: Array<{ trait_type: string; value: string | number }>;
}

export interface MintResult {
  txHash: string;
  policyId: string;
  assetName: string;
}

/**
 * Mints a CIP-25 compatible Midnight Fitness NFT on Cardano.
 * Set CARDANO_MOCK_MINT=false and provide Blockfrost + mnemonic for real minting.
 */
export async function mintWorkoutBadge(params: {
  badgeId: string;
  recipientAddress?: string | null;
  metadata: BadgeMetadata;
}): Promise<MintResult> {
  if (env.cardanoMockMint) {
    return mockMint(params.badgeId);
  }

  const { Lucid, Blockfrost, mintingPolicyToId } = await import("lucid-cardano");

  const lucid = await Lucid.new(
    new Blockfrost(
      `https://cardano-${env.cardanoNetwork.toLowerCase()}.blockfrost.io/api/v0`,
      env.blockfrostApiKey
    ),
    env.cardanoNetwork
  );

  lucid.selectWallet.fromSeed(env.cardanoMnemonic);

  const assetName = `MidnightFit${params.badgeId.slice(0, 8)}`;
  const mintingPolicy = await lucid.utils.mintingPolicy({
    type: "PlutusV2",
    script: "010203040506070809", // replace with compiled policy in production
  });
  const policyId = mintingPolicyToId(mintingPolicy);

  const tx = await lucid
    .newTx()
    .mintAssets(
      { [policyId + assetName]: 1n },
      Data.to(params.metadata)
    )
    .attachMintingPolicy(mintingPolicy);

  if (params.recipientAddress) {
    tx.pay.ToAddress(params.recipientAddress, {
      [policyId + assetName]: 1n,
    });
  }

  const signed = await tx.complete().then((completed) => completed.sign().complete());
  const txHash = await signed.submit();

  return { txHash, policyId, assetName };
}

function mockMint(badgeId: string): MintResult {
  const suffix = badgeId.slice(0, 8);
  return {
    txHash: `mock_tx_${suffix}_${Date.now()}`,
    policyId: "mock_policy_midnight_fitness_preprod",
    assetName: `MidnightFit${suffix}`,
  };
}

// Lucid Data helper placeholder — real implementation uses lucid Data schema
const Data = {
  to: (value: unknown) => JSON.stringify(value),
};