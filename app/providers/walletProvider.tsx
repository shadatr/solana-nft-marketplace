"use client";
import React, { ReactNode } from 'react'
import {PhantomWalletAdapter,SolflareWalletAdapter, TorusWalletAdapter,NightlyWalletAdapter} from "@solana/wallet-adapter-wallets";
import {ConnectionProvider,WalletProvider} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter(),new TorusWalletAdapter(), new NightlyWalletAdapter()];

const WalletAndSessionProvider = ({ children }:{children:ReactNode}) => {
    return (
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <main className="dark text-foreground bg-background">
              {children}
            </main>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    );
  };
  
export default WalletAndSessionProvider
