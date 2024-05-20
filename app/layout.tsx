
import type { Metadata } from "next";
import { Amaranth } from "next/font/google";
import "./globals.css";
import WalletAndSessionProvider from "./providers/walletProvider";
import { CandyMachineProvider } from "./providers/candyMachineProvider";
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/system";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

const inter = Amaranth({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} >
      <NextUIProvider className={cn(
          "min-h-screen bg-background dark font-sans antialiased",
  
        )}>
        <WalletAndSessionProvider>
          <CandyMachineProvider>
            <Link href={'/'}>
            <Image src={'/SolMintMarket.png'} width={200} height={200} alt={""} className="lg:m-10 sm:m-5 absolute left-0 top-0 z-40"/>
            </Link>
            {children}
            <Toaster />
            </CandyMachineProvider>
        </WalletAndSessionProvider>
      </NextUIProvider>
      </body>
    </html>
  );
}
