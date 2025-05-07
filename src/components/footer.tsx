import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#2c3e50] text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logotipo a la izquierda */}
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo Mi Blog" className="h-20 w-auto" />
           
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Enlaces rápidos</h3>
            <ul>
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Síguenos</h3>
            <ul>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-4">
          <p>&copy; {new Date().getFullYear()} Mi Blog. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
