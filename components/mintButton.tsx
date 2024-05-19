"use client";

import { RPC_URL } from "@/app/consts";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection, Transaction, VersionedTransaction } from "@solana/web3.js";
import axios from "axios";
import base58 from "bs58";
import React from "react";
import { useToast } from "./ui/use-toast";

const MintButton = () => {
  const wallet = useWallet();
  const { toast } = useToast()

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
          console.log("Minted successfully");
        } catch (e) {
          console.log("Minting failed");
        }
      }else{
        console.log("Minting failed from backend");
      }
    }else{
      toast({
        title: "You should select a wallet",
      })
    }
  };

  return (
    <button
      className="text-secondary border border-pink rounded-[30px]  py-3 font-bold px-14 mr-5"
      onClick={onClick}
    >
      Mint
    </button>
  );
};

export default MintButton;
