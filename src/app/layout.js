import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import { AppWrapper } from "@/context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation>
          <AppWrapper>
            {children}  
          </AppWrapper>
        </Navigation>
        <Toaster />
        </body>
    </html>
  );
}
