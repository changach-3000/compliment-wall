import type { Metadata } from "next";
import { Epilogue, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  weight: ["600", "700"],
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Flowers · KamiLimu",
  description: "Give someone their flowers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${epilogue.variable} ${jakarta.variable} ${caveat.variable}`}>
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}