import type { Metadata } from "next";
import { Inter as FontSans, Roboto, Nanum_Myeongjo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/context/UserContext";
import Fathom from "@/components/custom/Fathom";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    template: "%s | Infinite Spaces",
    default: "Infinite Spaces",
  },
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: !isProduction ? "noindex, nofollow" : "index, follow",
};

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-roboto",
  display: "swap",
});

const nm = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-nm",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.png" />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overscroll-none",
          fontSans.variable,
          roboto.variable,
          nm.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <Fathom />
            {children}
          </UserProvider>
        </ThemeProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
