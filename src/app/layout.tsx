import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// ✅ Tipa el objeto metadata
export const metadata: Metadata = {
  title: "Proscom",
  description:
    "Desarrollo web y soluciones seguras para tu negocio. En PROSCOM, innovamos contigo con tecnología confiable y eficiente.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} bg-gray-50 text-gray-800`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
