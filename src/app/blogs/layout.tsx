import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Blogs & Guides | Chiku Cabs",
  description:
    "Explore practical travel guides, road-trip tips, route advice, and cab-booking information from Chiku Cabs.",
  alternates: {
    canonical: "https://chikucabs.com/blogs",
  },
};

export default function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
