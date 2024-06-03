import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  mplToolbox,
  setComputeUnitLimit,
} from "@metaplex-foundation/mpl-toolbox";
import {
  createNoopSigner,
  createSignerFromKeypair,
  generateSigner,
  publicKey,
  signerIdentity,
  some,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { CANDY_MACHINE_PUBLIC_KEY, RPC_URL } from "../../consts";
import {
  mintV2,
  mplCandyMachine,
} from "@metaplex-foundation/mpl-candy-machine";

export async function POST(req: Request) {
  const { wallet } = await req.json();

  const minter = createNoopSigner(publicKey(wallet));

  let umi = createUmi(RPC_URL).use(mplToolbox()).use(mplCandyMachine());

  const cosignerKeypair = umi.eddsa.createKeypairFromSecretKey(
    base58.serialize(process.env.THIRD_PARTY_SIGNER!)
  );
  const cosigner = createSignerFromKeypair(umi, cosignerKeypair);

  umi = umi.use(signerIdentity(minter, true));

  const collectionMint = publicKey(
    process.env.NEXT_PUBLIC_COLLECTION_MINT ?? ""
  );
  const collectionUpdateAuthority = publicKey(
    process.env.NEXT_PUBLIC_COLLECTION_AUTHORITY ?? ""
  );

  const nftMint = generateSigner(umi);

  try{
    let tx = transactionBuilder()
      .add(setComputeUnitLimit(umi, { units: 800_000 }))
      .add(
        mintV2(umi, {
          candyMachine: CANDY_MACHINE_PUBLIC_KEY,
          nftMint,
          collectionMint,
          collectionUpdateAuthority,
          minter: minter,
          mintArgs: {
            thirdPartySigner: some({ signer: cosigner }),
            solPayment: some({
              destination: publicKey(
                "9qiLntdSpsjWqy6aLaexwH7UG5TTZoSw9caUFRY5DXCh"
              ),
            }),
          },
        })
      );

      tx = tx.setBlockhash(await umi.rpc.getLatestBlockhash()
      )
      tx.setFeePayer(minter)
  
    return new Response(
      JSON.stringify({
        tx: Buffer.from(
          umi.transactions.serialize(await tx.buildAndSign(umi))
        ).toString("base64"),
      })
    );
  }
  catch(e){
    return new Response(
      JSON.stringify({
        e
      })
      );
  }
}
