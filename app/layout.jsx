import { Montserrat } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Providers from "@/redux/Providers";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Pressure Testing",
  description: "Pressure machine testing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <AuthWrapper>
            <Image
              src="/images/bg.svg"
              alt="background image"
              className="fixed object-cover -z-10"
              width={0}
              height={0}
              quality={80}
              style={{ width: "100vw", height: "100vh" }}
            />
            {children}
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <div id="modal-root" /> {/* Portal container */}
          </AuthWrapper>
        </Providers>
      </body>
    </html>
  );
}
