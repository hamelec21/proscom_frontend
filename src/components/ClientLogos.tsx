// components/Clientes.tsx
import Image from "next/image";

export default function Clientes() {
  return (
    <section id="clientes" className="py-20 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Nuestros Clientes</h2>
        <p className="text-lg mb-8 text-gray-600">
          Nos enorgullece trabajar con empresas que confían en nuestra experiencia.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
          <div className="flex justify-center transform transition-transform hover:scale-105">
            <Image
              src="/clientes/beerlover.jpg"
              alt="Cliente 1"
              width={160}
              height={64}
              className="object-contain h-16 w-auto"
            />
          </div>
          <div className="flex justify-center transform transition-transform hover:scale-105">
            <Image
              src="/clientes/escsj.jpg"
              alt="Cliente 2"
              width={160}
              height={64}
              className="object-contain h-16 w-auto"
            />
          </div>
          <div className="flex justify-center transform transition-transform hover:scale-105">
            <Image
              src="/clientes/logo-andes.jpeg"
              alt="Cliente 3"
              width={160}
              height={64}
              className="object-contain h-16 w-auto"
            />
          </div>
          {/* Puedes añadir más logos según sea necesario */}
        </div>
      </div>
    </section>
  );
}
