import Link from "next/link";
import UltimosPosts from "@/components/UltimosPosts";

export default function Servicios() {
  const servicios = [
    {
      nombre: "Desarrollo de Software a Medida",
      descripcion:
        "Creamos soluciones digitales personalizadas para tu negocio. Software seguro, escalable y alineado a tus procesos.",
      imagen: "/servicios/mobile-app-svgrepo-com.svg",
    },
    {
      nombre: "Seguridad Informática",
      descripcion:
        "Protege tu información, tu reputación y tu crecimiento con medidas de ciberseguridad efectivas.",
      imagen: "/servicios/safe-and-stable-svgrepo-com.svg",
    },
    {
      nombre: "Consultoría Tecnológica",
      descripcion:
        "Te ayudamos a tomar decisiones estratégicas con asesoría en tecnologías, arquitectura de sistemas y desarrollo seguro.",
      imagen: "/servicios/touch-click-svgrepo-com.svg",
    },
    {
      nombre: "Desarrollo Web Profesional",
      descripcion:
        "Diseñamos sitios web modernos, rápidos y adaptables que conectan con tus clientes y transmiten confianza.",
      imagen: "/servicios/availability-svgrepo-com.svg",
    },
    {
      nombre: "Mantenimiento y Soporte Técnico",
      descripcion:
        "Mantenemos tus sistemas actualizados, seguros y funcionando con soporte técnico confiable.",
      imagen: "/servicios/7x24h-svgrepo-com.svg",
    },
    {
      nombre: "Capacitación en Desarrollo Seguro",
      descripcion:
        "Capacitamos a tu equipo con buenas prácticas de programación segura y concientización en ciberseguridad.",
      imagen: "/servicios/dns-svgrepo-com.svg",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Banner principal */}
      <section className="w-full bg-[url('/bg-nosotros.png')] bg-cover bg-center bg-no-repeat py-10 md:py-16 lg:py-28">
        <h2 className="text-4xl font-bold mb-4 text-center text-white drop-shadow-md">
          Servicios
        </h2>
      </section>

      {/* Lista de servicios */}
      <section className="container mx-auto px-4 mt-10 mb-10">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-300 rounded-lg shadow-sm mx-auto flex flex-col items-center text-center p-4"
            >
              {/* Imagen */}
              <Link href="#">
                <img
                  className="rounded-t-lg max-w-[200px] w-full h-auto mx-auto mb-4"
                  src={servicio.imagen}
                  alt={servicio.nombre}
                />
              </Link>

              {/* Contenido */}
              <h5 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                {servicio.nombre}
              </h5>
              <p className="mb-4 text-gray-700 dark:text-gray-400">
                {servicio.descripcion}
              </p>

              {/* Botón */}
              <Link href="/contacto" className="mt-auto">
                <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                  Solicita este servicio
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Últimos posts */}
      <section id="blog" className="py-20 px-6 bg-gray-100">
        <UltimosPosts />
      </section>
    </main>
  );
}
