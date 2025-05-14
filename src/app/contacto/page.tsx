'use client';

export default function Contacto() {
  const telefonoWhatsApp = '+56912345678'; // sin espacios ni símbolos

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <section className="bg-white border shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4">Contáctanos</h2>
        
        <p className="text-gray-700 text-lg mb-2">
          <strong>Teléfono:</strong> +56 9 1234 5678
        </p>
        
        <p className="text-gray-700 text-lg mb-6">
          <strong>Email:</strong> contacto@tuempresa.cl
        </p>

        <a
          href={`https://wa.me/${telefonoWhatsApp.replace(/[^\d]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
        >
          Enviar mensaje por WhatsApp
        </a>
      </section>
    </main>
  );
}
