"use client";
import Image from "next/image";
import { useCandyMachine } from "./providers/candyMachineProvider";
import { useEffect } from "react";
import { type } from "os";
import axios from "axios";


export default function Home() {
  const candyMachine= useCandyMachine()

  // useEffect(()=>{
  //   const uploadData=async ()=>{

  //     const fetchData = async (url:string) => {
  //       try {
  //         const response = await axios.get(url);
  //         if (!response) {
  //           console.log('Failed to fetch data');
  //         }
  //         return response.data;
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //         return null;
  //       }
  //     };
      
  //     // Function to fetch data for all items
  //     const fetchAllData = async () => {
  //       const fetchedItems = [];
  //       if(candyMachine.candyMachine?.items)
  //       for (const item of candyMachine.candyMachine?.items) {
  //         const { index, uri, ...rest } = item;
  //         let fetchedItem;
  //         const data:CandyMachinetype = await fetchData(uri);
  //         if (data) {
  //           fetchedItem = data;
  //         }
  //         fetchedItems.push(fetchedItem);
  //       }
  //       return fetchedItems;
  //     };
      
  //     // Usage
  //     const fetchedItems= await fetchAllData()
  //       console.log('Fetched items:', fetchedItems);
  //   }
  //   uploadData()
  // },[candyMachine.mintGroups])

  console.log(candyMachine)
  return (
    <div>
      {candyMachine.candyMachine?.items.map((item,index)=>
      <span key={index}>
        {/* <Image width={100} height={100} src={}/> */}
      </span>)}
    </div>
  );
}
