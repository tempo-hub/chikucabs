import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL("https://chikucabs.com"),
  title: "Chiku Cabs | Premium Taxi Service in India",
  description:
    "Book premium cabs, tempos, and buses with Chiku Cabs. India's top-rated outstation and local cab rental service with verified drivers.",
  verification: {
    google: "m03tk-J2zYcDgTnZ_1MznNurLakrwcqn8sdTYOGWNCM",
  },
  icons: {
    icon: "/yt.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <Navbar />

        {children}

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />

        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
