import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Modern Blog",
  description: "A colorful blog with modern UI",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider refetchOnWindowFocus={false}>
            <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
              <Navbar />
              <main className="container mx-auto py-6 px-4 md:px-6">
                {children}
              </main>
              <Toaster />
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
