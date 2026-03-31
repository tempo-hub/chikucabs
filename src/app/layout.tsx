import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Chiku Cabs | Premium Taxi Service in India",
    description: "Book premium cabs, tempos, and buses with Chiku Cabs. India's top-rated outstation and local cab rental service with verified drivers.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </head>
            <body>{children}</body>
        </html>
    );
}
