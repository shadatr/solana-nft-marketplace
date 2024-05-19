"use client";

import { WavyBackground } from "@/components/ui/wavy-background.tsx";
import Link from "next/link";

export default function Home() {

  return (
    <div>
      <WavyBackground className="max-w-4xl mx-auto pb-40 gap-5">
      <p className="text-lg text-secondary font-bold text-center">
      Discover unique NFTs minted on the Solana blockchain. With CandyMachine integration, each mint offers a surprise, making every transaction exciting. Support artists, join our vibrant community, and start your NFT journey today!      
      </p>
      <p className="text-center mt-5">

      <Link href={'/shop'} className="text-center text-lightBlue border-2 border-pink py-3 px-6 text-md rounded-2xl ">Shop Now</Link> 
      </p>
    </WavyBackground>
    </div>
  );
}
