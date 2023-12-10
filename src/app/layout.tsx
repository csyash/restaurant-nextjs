import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Notification from "./components/Notification";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sip & Bite",
  description:
    "S+ restaurant based in Raipur. Located at Marine Drive, Telibandha, Raipur",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="no-scrollbar">
        <AuthProvider>
          <Notification />
          <Nav />
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            theme="light"
          />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
