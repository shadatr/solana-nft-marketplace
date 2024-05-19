"use client";
import { FC, useContext, useEffect, useMemo, useState } from "react";

import {
  CandyMachine,
  fetchCandyGuard,
  fetchCandyMachine,
  mplCandyMachine,
} from "@metaplex-foundation/mpl-candy-machine";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CANDY_MACHINE_PUBLIC_KEY } from "../consts";
import { Umi } from "@metaplex-foundation/umi";
import { CandyMachineItemsType, GuardGroupType } from "@/types";
import base58 from "bs58";
import { createContext } from "react";
import axios from "axios";
import { mockStorage } from "@metaplex-foundation/umi-storage-mock";

type CandyMachineContextState = {
  candyMachine: CandyMachine | undefined;
  mintGroups: GuardGroupType[] | undefined;
  items: CandyMachineItemsType[] | undefined;
};

const candyMachineContext = createContext<CandyMachineContextState | undefined>(
  undefined
);

interface CandyMachineProviderProps {
  children: React.ReactNode;
}

export const CandyMachineProvider: FC<CandyMachineProviderProps> = ({
  children,
}) => {
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();
  const wallet = useWallet();
  const { connection } = useConnection();
  const [mintGroups, setMintGroups] = useState<GuardGroupType[]>();
  const [items, setItems] = useState<CandyMachineItemsType[]>();

  const umi = useMemo(
    () =>
      createUmi(connection)
        .use(walletAdapterIdentity(wallet))
        .use(mplCandyMachine())
        .use(mplTokenMetadata()),
    [wallet, connection]
  );

  useEffect(() => {
    if (umi) {
      loadCandymachine(umi);
    }
  }, [umi]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (umi) {
        loadCandymachine(umi);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [candyMachine?.items, umi]);

  const loadCandymachine = async (umi: Umi) => {
    if (umi) {
      const candymachine = await fetchCandyMachine(
        umi,
        CANDY_MACHINE_PUBLIC_KEY,
        {
          commitment: "processed",
        }
      );

      setCandyMachine(candymachine);

      const guardData = await fetchCandyGuard(umi, candymachine.mintAuthority, {
        commitment: "processed",
      });

      const groups: GuardGroupType[] = [];
      for (let i = 0; i < guardData.groups.length; i++) {
        const group = guardData.groups[i];
        const mintGroup: GuardGroupType = {
          label: group.label,
          thirdPartySigner: group.guards.thirdPartySigner.__option == "Some",
        };

        if (group.guards.allocation.__option == "Some") {
          mintGroup.allocation = group.guards.allocation.value.limit;
        }

        if (group.guards.solPayment.__option == "Some") {
          const solPayment = group.guards.solPayment;
          const price =
            parseInt(solPayment.value.lamports.basisPoints.toString()) / 1e9;
          mintGroup.price = price;
        } else if (guardData.guards.solPayment.__option == "Some") {
          const solPayment = guardData.guards.solPayment;
          const price =
            parseInt(solPayment.value.lamports.basisPoints.toString()) / 1e9;
          mintGroup.price = price;
        }

        if (group.guards.startDate.__option == "Some") {
          const startDate = group.guards.startDate.value;
          mintGroup.startDate = Number(startDate.date.toString());
        } else if (guardData.guards.startDate.__option == "Some") {
          const startDate = guardData.guards.startDate.value;
          mintGroup.startDate = Number(startDate.date.toString());
        }

        if (group.guards.endDate.__option == "Some") {
          const endTime = group.guards.endDate.value;
          mintGroup.endDate = Number(endTime.date.toString());
        } else if (guardData.guards.endDate.__option == "Some") {
          const endTime = guardData.guards.endDate.value;
          mintGroup.endDate = Number(endTime.date.toString());
        }

        if (group.guards.allowList.__option == "Some") {
          const allowList = group.guards.allowList.value;
          mintGroup.allowListHash = base58.encode(allowList.merkleRoot);
        } else if (guardData.guards.allowList.__option == "Some") {
          const allowList = guardData.guards.allowList.value;
          mintGroup.allowListHash = base58.encode(allowList.merkleRoot);
        }

        if (group.guards.mintLimit.__option == "Some") {
          const mintLimit = group.guards.mintLimit.value;
          mintGroup.mintLimit = { limit: mintLimit.limit, id: mintLimit.id };
        } else if (guardData.guards.mintLimit.__option == "Some") {
          const mintLimit = guardData.guards.mintLimit.value;
          mintGroup.mintLimit = { limit: mintLimit.limit, id: mintLimit.id };
        }
        groups.push(mintGroup);
      }

      setMintGroups(groups);

      const fetchedItems: CandyMachineItemsType[] | undefined = [];
  
      for (const item of candymachine?.items) {
        let fetchedItem:CandyMachineItemsType;
        const data = await axios.get(item.uri);
        if (data) {
          fetchedItem = data.data;
          fetchedItem.index=data.data.index
          fetchedItems.push(fetchedItem);
        }
      }
      setItems(fetchedItems);
    }
  };

  return (
    <candyMachineContext.Provider
      value={{
        candyMachine,
        mintGroups,
        items,
      }}
    >
      {children}
    </candyMachineContext.Provider>
  );
};

export const useCandyMachine = () => {
  const context = useContext(candyMachineContext);
  if (context === undefined) {
    throw new Error(
      "useCandyMachine must be used within a CandyMachineProvider"
    );
  }
  return context;
};
