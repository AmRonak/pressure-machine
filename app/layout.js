import { Montserrat } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Navigation from "@/components/buttons/Navigation";
import ShutDown from "@/components/buttons/ShutDown";
import Providers from "@/redux/Providers";
import AuthWrapper from "@/components/Auth/AuthWrapper";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <AuthWrapper>
            <Navigation />
            <ShutDown />
            <Image
              src='/images/bg.svg'
              alt="background image"
              fill={true}
              className="object-cover -z-10"
            />
            {children}
          </AuthWrapper>
        </Providers>
      </body>
    </html>
  );
}
