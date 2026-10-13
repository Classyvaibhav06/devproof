import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DevProof — Ship in Public. Level Up.",
    template: "%s | DevProof",
  },
  description:
    "DevProof is where developers prove their skills — solve challenges, ship projects in public, collaborate in the War Room, and level up on the XP leaderboard.",
  keywords: ["developer", "coding", "leetcode", "github", "projects", "leaderboard", "open source"],
  authors: [{ name: "DevProof" }],
  openGraph: {
    title: "DevProof — Ship in Public. Level Up.",
    description: "The platform where real devs prove their skills.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevProof",
    description: "Ship in Public. Level Up.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={GeistSans.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
