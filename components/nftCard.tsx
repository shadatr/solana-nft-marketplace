"use client";

import { CandyMachineItemsType } from '@/types'
import { CandyMachineItem } from '@metaplex-foundation/mpl-candy-machine'
import Image from 'next/image'
import React from 'react'

const NftCard = ({itemMetadata,nftItem}:{itemMetadata:CandyMachineItemsType,nftItem:CandyMachineItem}) => {
  return (
    <div className='p-5 bg-midBlue text-secondary w-[250px] h-[430px]  flex flex-col text-center gap-2'>
     <Image width={100} height={100} className='w-[250px] h-auto bg-Blue' src={itemMetadata.image} alt={""}/>
     <div className='flex flex-col gap-2'>
        <span className='font-black text-[24px]'>{itemMetadata.name}</span>
        <span>{itemMetadata.description}</span>
        <span className={`flex items-center justify-center p-1 ${nftItem.minted? "bg-red-500":"bg-lightBlue"} my-2`}>{nftItem.minted?"sold out":"available"}</span>
        <span className='flex gap-2 text-center items-center justify-center'><p>Price: 1.5 </p><Image src={'/solana.png'} alt={''} width={25} height={40}/></span>
     </div>
    </div>
  )
}

export default NftCard