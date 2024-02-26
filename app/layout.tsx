import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./_components/navbar";
import "./globals.css"
import { ReactQueryClientProvider } from "./QueryClientProvider";


const inter = Inter({ subsets: ["latin"] });

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
    <ReactQueryClientProvider>
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        
        {children}
  
       
        </body>
    </html>
    </ReactQueryClientProvider>
  );
}

