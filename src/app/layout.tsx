import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/AppContext";

const PoppinsFont = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Typio",
  description: "Typio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="en">
        <body
          className={` ${PoppinsFont.variable} antialiased bg-[#222831] text-white`}
        >
          {children}
        </body>
      </html>
    </AppProvider>
  );
}
