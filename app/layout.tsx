import "../global.css";
import { Inter, Roboto_Mono } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
export const metadata: Metadata = {
  title: {
    default: "thesimonyoung",
    template: "%s | thesimonyoung.com",
  },
  description: "Founder of End Hunt",
  openGraph: {
    title: "theSimonYoung.com",
    description:
      "UX designer | Founder of End Hunt",
    url: "https://theSimonYoung.com",
    siteName: "theSimonYoung.com",
    images: [
      {
        url: "https://theSimonYoung.com/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Simon Young | UX designer",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const displaySans = LocalFont({
  src: "../public/fonts/manuka-condensed-black.woff2",
  variable: "--font-display",
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "500"
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, displaySans.variable, mono.variable].join(" ")}>
      <head>
      
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-12KQNZ00Y1" />
    </html>
  );
}
