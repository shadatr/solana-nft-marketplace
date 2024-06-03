"use client";

import { RPC_URL } from "@/app/consts";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, Transaction, VersionedTransaction } from "@solana/web3.js";
import axios from "axios";
import base58 from "bs58";
import React from "react";
import { useToast } from "./ui/use-toast";

const MintButton = () => {
  const wallet = useWallet();
  const { toast } = useToast();

  const onClick = async () => {
    let connection = new Connection(RPC_URL);
    if (wallet.publicKey) {
      const walletPubKey = base58.encode(wallet.publicKey.toBuffer());
      const data = await axios.post("/api/mint", { wallet: walletPubKey });
      console.log(data.data);
      const tx = VersionedTransaction.deserialize(
        Buffer.from(data.data.tx, "base64")
      );
      try {
        const signedTx = await wallet.signTransaction?.(tx);
        const txSig = await connection.sendTransaction(signedTx!, {
          skipPreflight: true,
        });

        await connection.confirmTransaction(txSig, "processed");

        toast({
          title: "Minting was successfull!",
        });
      } catch (e) {
        toast({
          title: "Minting failed",
        });
      }
    } else {
      toast({
        title: "You should select a wallet",
      });
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
