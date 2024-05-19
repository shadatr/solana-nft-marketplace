"use client";

import { CandyMachineItemsType } from '@/types'
import { CandyMachineItem } from '@metaplex-foundation/mpl-candy-machine'
import Image from 'next/image'
import React from 'react'

const NftCard = ({itemMetadata,nftItem}:{itemMetadata:CandyMachineItemsType,nftItem:CandyMachineItem}) => {
  return (
    <div className='p-8 bg-Blue rounded-[30px] w-[300px] h-[450px]'>
     <Image width={100} height={100} className='w-[300px] h-auto bg-Blue' src={itemMetadata.image} alt={""}/>
     <div className='flex flex-col'>
        <span className='font-black text-[24px]'>{itemMetadata.name}</span>
        <span>{itemMetadata.description}</span>
        <span className={`flex items-center justify-center p-3 ${nftItem.minted? "bg-red-500":"bg-BlueGrotto"} my-2`}>{nftItem.minted?"sold out":"available"}</span>
     </div>

    </div>
  )
}

export default NftCard