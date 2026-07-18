import type { Metadata } from "next";
import "./globals.css";
import PCBBackground from "@/components/layout/PCBBackground";
import FloatingQRWrapper from "@/components/ui/FloatingQRWrapper";
import PageTransition from "@/components/layout/PageTransition";
import Footer from "@/components/layout/Footer";
import { ProgressProvider } from "@/context/ProgressContext";

export const metadata: Metadata = {
  title: "AI for Electronics Engineers | Workshop",
  description: "A comprehensive educational platform for electronics engineers learning AI — from fundamentals to production-ready edge deployment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <PCBBackground />
        <ProgressProvider>
          <main className="main-content">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ProgressProvider>
        <FloatingQRWrapper />
      </body>
    </html>
  );
}
