import { notFound } from "next/navigation";
// Importa tus componentes y tipos específicos para proyectos

interface Proyecto {
  // Define la interfaz para tus proyectos
  id: number;
  title: string;
  descripcion: string;
  // ... otras propiedades
  slug: string;
}

async function getProyecto(slug: string): Promise<Proyecto | null> {
  // Implementa tu función para obtener un proyecto por su slug
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proyectos/${slug}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProyectoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const proyecto = await getProyecto(slug);

  if (!proyecto) {
    notFound();
    return null;
  }

  return (
    <section>
      <h1>{proyecto.title}</h1>
      <p>{proyecto.descripcion}</p>
      {/* Renderiza los detalles de tu proyecto */}
    </section>
  );
}