"use client";
import MintButton from "@/components/mintButton";
import { useCandyMachine } from "./providers/candyMachineProvider";
import NftCard from "@/components/nftCard";
import { Wallet } from "@/components/wallet";

export default function Home() {
  const candyMachine = useCandyMachine();

  return (
    <div className="bg-NavyBlue flex flex-col justify-center items-center p-12 text-secondary">
      <Wallet/>
      <MintButton/>
      <div className="grid grid-cols-4 gap-4">
        {candyMachine.items?.map((item, index) => {
          const nftItem=candyMachine.candyMachine?.items.find((itm,index)=>itm.name==item.name)
          if(nftItem)
          return(
          <span key={index}>
            <NftCard itemMetadata={item} nftItem={nftItem}/>
          </span>
        )})}
      </div>
    </div>
  );
}
