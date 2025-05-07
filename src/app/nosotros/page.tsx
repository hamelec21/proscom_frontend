export default function Nosotros() {
  return (
    <main className="min-h-screen">
      {/* Título principal con fondo */}
      <section className="w-full bg-[url('/bg-nosotros.png')] bg-cover bg-center bg-no-repeat  py-10 md:py-16 lg:py-28">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white drop-shadow-md">
            Nosotros
          </h2>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="container mx-auto px-4 mt-10">
        <p className="text-base md:text-lg text-gray-700 text-justify leading-relaxed">
          <strong>Quiénes Somos:</strong> En <strong>Proscom</strong>, creemos
          que cada proyecto nace de una idea poderosa, una visión que merece
          avanzar con seguridad, confianza y respaldo real. Somos una empresa
          especializada en <strong>desarrollo tecnológico</strong> y{" "}
          <strong>soluciones en ciberseguridad</strong>, creada para acompañar a
          emprendedores, startups y empresas en la construcción de su futuro
          digital sin poner en riesgo lo más importante: su información, su
          reputación y su crecimiento.
          <br />
          <br />
          Más que proveedores, somos <strong>aliados estratégicos</strong>. Nos
          involucramos en cada etapa de tu proyecto, desde la planificación y el
          desarrollo, hasta la implementación y protección continua. Porque
          entendemos que un buen producto no solo debe funcionar: debe ser{" "}
          <strong>seguro, escalable y confiable</strong>.
        </p>
      </section>

      {/* Misión */}
      <section className="container mx-auto px-4 mt-10">
        <p className="text-base md:text-lg text-gray-700 text-justify leading-relaxed">
          <strong>Nuestra Misión:</strong> Impulsar a personas y empresas a
          construir soluciones tecnológicas robustas, acompañándolas con
          herramientas de desarrollo seguras, innovadoras y alineadas a sus
          objetivos.
        </p>
      </section>

      {/* Visión */}
      <section className="container mx-auto px-4 mt-10">
        <p className="text-base md:text-lg text-gray-700 text-justify leading-relaxed">
          <strong>Nuestra Visión:</strong> Ser reconocidos como líderes en
          desarrollo seguro en Latinoamérica, destacando por la excelencia, la
          cercanía con nuestros clientes y el impacto positivo de nuestras
          soluciones.
        </p>
      </section>

      {/* Valores */}
      <section className="container mx-auto px-4 mt-10 mb-20">
        <div className="text-base md:text-lg text-gray-700 text-justify leading-relaxed">
          <strong>Nuestros Valores:</strong>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>
              <strong>Confianza:</strong> Construimos relaciones sólidas y
              duraderas.
            </li>
            <li>
              <strong>Innovación:</strong> Nos mantenemos en constante evolución.
            </li>
            <li>
              <strong>Compromiso:</strong> Tu éxito es también el nuestro.
            </li>
            <li>
              <strong>Transparencia:</strong> Hablamos claro y actuamos con
              integridad.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
