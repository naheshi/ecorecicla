import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ecorecicla Web",
  description: "Proyecto web de Ecorecicla",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
    

        {children}
      </body>
    </html>
  );
}
