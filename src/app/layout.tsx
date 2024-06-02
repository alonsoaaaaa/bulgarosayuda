import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Container from "@/components/container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bulgaros Ayuda",
  description: "Ayuda para hacer bulgaros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className+"flex items-center justify-center"}>
        <Container>
        {children}
        </Container>
        </body>
    </html>
  );
}
