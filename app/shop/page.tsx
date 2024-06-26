"use client";
import React from "react";
import MintButton from "@/components/mintButton";
import NftCard from "@/components/nftCard";
import { useCandyMachine } from "../providers/candyMachineProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");

const Page = () => {
  const candyMachine = useCandyMachine();
  const wallet = useWallet();

  return (
    <div className="flex w-[100%] justify-center items-center flex-col">
      <div className="right-0 lg:top-0 sm:top-14 m-5 absolute flex items-center">
        {wallet.publicKey && <MintButton />}

        <WalletMultiButton
          className="border border-pink"
          style={{ background: "#00C2FF", borderRadius: "30px" }}
        />
      </div>
      {candyMachine.candyMachine ? (
        <div className="grid lg:grid-cols-4 gap-4 lg:w-[80%] sm:w-[100%] justify-center items-center mt-40">
          {candyMachine.items?.map((item, index) => {
            const nftItem = candyMachine.candyMachine?.items.find(
              (itm, index) => itm.name == item.name
            );
            if (nftItem)
              return (
                <span key={index}>
                  <NftCard itemMetadata={item} nftItem={nftItem} />
                </span>
              );
          })}
        </div>
      ) : (
        <div className="grid lg:grid-cols-4  gap-4 w-[80%] mt-40">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="flex p-5 flex-col space-y-3 w-[250px] h-[430px] bg-midBlue"
            >
              <Skeleton className="h-[250px] w-[210px] rounded-xl" />
              <div className="space-y-2 flex items-center justify-center flex-col gap-2">
                <Skeleton className="h-6 w-[150px] rounded-xl" />
                <Skeleton className="h-6 w-[120px] rounded-xl" />
                <Skeleton className="h-6 w-[170px] rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
