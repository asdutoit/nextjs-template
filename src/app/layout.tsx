import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import "./globals.css";

import { cn } from "@/lib/utils";
import ThemeCustomizer from "@/components/theme-customizer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "Homerunner | %s",
    default: "Homerunner - Real Estate Listings, Properties, and More", // a default is required when creating a template
  },
  description:
    "Homerunner is your one-stop destination for real estate listings, properties, land, and commercial spaces. Whether you're a realtor, agent, private seller, or buyer, find the perfect match for your needs.",
  keywords:
    "real estate, listings, properties, land, commercial real estate, homes for sale, homes for rent, apartments for rent, apartments for sale, flats, agents, realtors, buyers, sellers",
  authors: { name: "Homerunner" },
  robots: "index, follow",
  openGraph: {
    title: "Homerunner - Real Estate Listings, Properties, and More",
    description:
      "Homerunner is your one-stop destination for real estate listings, properties, land, and commercial spaces. Whether you're a realtor, agent, private seller, or buyer, find the perfect match for your needs.",
    url: "https://www.homerunner.co.za",
    siteName: "Homerunner",
    images: [
      {
        url: "https://nextjs.org/og.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) {
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <SessionProvider basePath={"/api/auth"} session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeCustomizer />
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
