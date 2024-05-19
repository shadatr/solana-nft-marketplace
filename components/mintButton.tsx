"use client";

import { RPC_URL } from "@/app/consts";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection, Transaction, VersionedTransaction } from "@solana/web3.js";
import axios from "axios";
import base58 from "bs58";
import React from "react";

const MintButton = () => {
  const wallet = useWallet();

  const onClick = async () => {
    let connection = new Connection(RPC_URL);
    if (wallet.publicKey) {
      const walletPubKey = base58.encode(wallet.publicKey.toBuffer());
      const data = await axios.post("/api/mint", { wallet: walletPubKey });
      if(data.data.tx){
        try {
          const tx = VersionedTransaction.deserialize(
            Buffer.from(data.data.tx, "base64")
            );
            console.log(tx)
          const signedTx = await wallet.signTransaction?.(tx);
          const txSig = await connection.sendTransaction(signedTx!, {
            skipPreflight: true,
          });
          console.log(txSig);
          console.log("Minted successfully");
        } catch (e) {
          console.log(e);
          console.log("Minting failed");
        }
      }else{
        console.log("Minting failed from backend");
      }
    }
  };

  return (
    <button
      className="bg-BlueGrotto text-[30px] py-5 px-14 m-4 rounded-3xl"
      onClick={onClick}
    >
      Mint
    </button>
  );
};

export default MintButton;
