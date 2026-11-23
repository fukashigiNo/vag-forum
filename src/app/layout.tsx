import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReduxProvider } from "@/shared/store/providers";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VAG-forum",
  description: "Форум для владельцев автомобилей концерна VAG: Volkswagen, Audi, Škoda, SEAT, Cupra, Porsche и других.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <Header />
            {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
