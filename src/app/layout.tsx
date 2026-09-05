import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tonyanglesey.github.io"),
  title: {
    default: "Tony Anglesey — Portfolio & Blog",
    template: "%s — Tony Anglesey",
  },
  description:
    "Tony Anglesey — full-stack developer and UI/UX designer crafting intuitive, modern, user-focused digital experiences. Building the lla.ma open-source apps.",
  authors: [{ name: "Tony Anglesey" }],
  icons: { icon: "/icon.png" },
  openGraph: {
    title: "Tony Anglesey — Portfolio & Blog",
    description:
      "Full-stack developer and UI/UX designer crafting intuitive, modern, user-focused digital experiences.",
    type: "website",
    url: "https://tonyanglesey.github.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${jetbrainsMono.variable}`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
