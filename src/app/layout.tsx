import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; // Asegúrate de que el path esté correcto
import Footer from "@/components/footer";
import { Poppins } from "next/font/google";
import "./globals.css";

// Configuración de la fuente Poppins
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Puedes ajustar los pesos de la fuente según lo necesites
});

export const metadata = {
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
        <Navbar /> {/* Este es el componente Navbar */}
        {children} {/* Aquí se renderizan los contenidos de las páginas */}
        <Footer />
      </body>
    </html>
  );
}
