// src/app/proyectos/[slug]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Define la interfaz para el proyecto
interface Proyecto {
  id: number;
  title: string;
  description: string;
  slug: string;
  image_url: string;
}

// Props esperados por Next.js para páginas dinámicas
interface ProyectoDetailPageProps {
  params: {
    slug: string;
  };
}

// Función para obtener datos desde la API
async function getProyecto(slug: string): Promise<Proyecto | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}

// Página del proyecto
export default async function ProyectoDetailPage({
  params,
}: ProyectoDetailPageProps) {
  const proyecto = await getProyecto(params.slug);

  if (!proyecto) {
    notFound();
    return null;
  }

  return (
    <section className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">{proyecto.title}</h1>

      {proyecto.image_url && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={proyecto.image_url}
            alt={proyecto.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>
      )}

      <p className="text-lg text-gray-700 text-justify mb-8">
        {proyecto.description}
      </p>

      <div className="mt-8">
        <Link
          href="/proyectos"
          className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow hover:bg-gray-800 transition"
        >
          ← Volver a todos los proyectos
        </Link>
      </div>
    </section>
  );
}
