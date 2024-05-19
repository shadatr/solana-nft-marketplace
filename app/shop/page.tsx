"use client";
import React from "react";
import MintButton from "@/components/mintButton";
import NftCard from "@/components/nftCard";
import { Wallet } from "@/components/wallet";
import { useCandyMachine } from "../providers/candyMachineProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { useWallet } from "@solana/wallet-adapter-react";

const Page = () => {
  const candyMachine = useCandyMachine();
  const { connected } = useWallet();

  return (
    <div className="flex w-[100%] justify-center items-center flex-col">
      <div className="right-0 top-0 m-5 absolute ">
        {connected&&
        <MintButton />
        }
        <Wallet />
      </div>
      {candyMachine.candyMachine?
      <div className="grid grid-cols-4 gap-4 w-[80%] mt-40">
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
      :
      <div className="grid grid-cols-4 gap-4 w-[80%] mt-40">
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
      }
    </div>
  );
};

export default Page;
