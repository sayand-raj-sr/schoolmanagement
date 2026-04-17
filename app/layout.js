import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "School Management System",
  description: "MERN Stack Project",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        
        {/* ✅ Header */}
        <Header/>

        {/* ✅ Main Content */}
        <main className="flex-grow p-4">
          {children}
        </main>

        {/* ✅ Footer */}
        <Footer/>

      </body>
    </html>
  );
}
