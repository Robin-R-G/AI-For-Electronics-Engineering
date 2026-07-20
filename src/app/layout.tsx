import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import FloatingQRWrapper from "@/components/ui/FloatingQRWrapper";
import PageTransition from "@/components/layout/PageTransition";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ProgressProvider } from "@/context/ProgressContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
  preload: false,
});

export const metadata: Metadata = {
  title: "AI for Electronics Engineers | Workshop",
  description:
    "A comprehensive educational platform for electronics engineers learning AI — from fundamentals to production-ready edge deployment.",
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <ProgressProvider>
            <main className="main-content">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </ProgressProvider>
        </ThemeProvider>
        <MobileBottomNav />
        <FloatingQRWrapper />
      </body>
    </html>
  );
}
