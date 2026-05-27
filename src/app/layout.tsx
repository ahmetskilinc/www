import "./globals.css";
import { getUrl } from "@/utilities/getUrl";
import { Geist_Mono, Geist, Fraunces } from "next/font/google";
import { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

type Props = {
  children: React.ReactNode;
};

const GeistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const GeistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const FrauncesDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${FrauncesDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-sans bg-background text-foreground overscroll-none antialiased">
        <ThemeProvider defaultTheme="system" storageKey="ahmet-theme">
          {children}
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
};

export default RootLayout;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0B0E" },
  ],
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getUrl),
  title: {
    default: "Ahmet Kilinc | Software Engineer | Based in London",
    template: `%s - Ahmet Kilinc | Software Engineer | Based in London`,
  },
  description: "Explore my projects and previous work, or contact me.",
};
