"use client";

import { CANDY_MACHINE_PUBLIC_KEY, RPC_URL } from "@/app/consts";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, Transaction, VersionedTransaction } from "@solana/web3.js";
import axios from "axios";
import base58 from "bs58";
import React from "react";
import { useToast } from "./ui/use-toast";
import { fetchCandyGuard, fetchCandyMachine, mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Umi } from "@metaplex-foundation/umi";

const MintButton = () => {
  const wallet = useWallet();
  const { toast } = useToast();

  const onClick = async () => {
    let connection = new Connection(RPC_URL);

    if (wallet.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey)/ 1_000_000_000;
      if (balance < 1.53) {
        toast({ title: "Insufficient balance for minting" });
        return;
      }
      const walletPubKey = base58.encode(wallet.publicKey.toBuffer());
      const response = await axios.post("/api/mint", { wallet: walletPubKey });
      const txData = response.data;
      console.log(txData);
      
      if (txData.error) {
        throw new Error(txData.error);
      }
      const tx = VersionedTransaction.deserialize(
        Buffer.from(txData.tx, "base64")
      );

      try {
        if (!tx) {
          throw new Error("Transaction object is not valid.");
        }
      
        // Sign the transaction
        const signedTx = await wallet.signTransaction?.(tx);
        if (!signedTx) {
          throw new Error("Failed to sign the transaction.");
        }
      
        // Send the transaction and include preflight checks
        const txSig = await connection.sendTransaction(signedTx, {
          skipPreflight: false, // It's more secure to perform preflight checks
        });
      
        // Confirm the transaction
        const confirmation = await connection.confirmTransaction(txSig, "processed");
        if (confirmation.value.err) {
          throw new Error("Transaction failed during confirmation.");
        }
      

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

