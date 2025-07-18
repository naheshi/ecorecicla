import { Roboto } from "next/font/google";
import "./globals.css";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
  variable: "--font-roboto",     
});
export const metadata = {
  title: "Ecorecicla Web",
  description: "Proyecto web de Ecorecicla",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
         className={roboto.className}
      >
    

        {children}
      </body>
    </html>
  );
}
