import { notFound } from "next/navigation";
import Head from "next/head";

interface Proyecto {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url?: string;
  link?: string;
}

// Función para obtener proyecto por slug
async function getProyecto(slug: string): Promise<Proyecto | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json(); 
  } catch (error) {
    console.error("Error fetching proyecto:", error);
    return null;
  }
}

export default async function ProyectoDetailPage({ params }: { params: { slug: string } }) {
  const proyecto = await getProyecto(params.slug);

  if (!proyecto) {
    notFound();
  }

  return (
    <>
      <Head>
        <title>{proyecto.title} - Proyecto</title>
        <meta name="description" content={proyecto.description} />
        <meta property="og:title" content={proyecto.title} />
        <meta property="og:description" content={proyecto.description} />
        {proyecto.image_url && (
          <meta property="og:image" content={proyecto.image_url} />
        )}
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={proyecto.title} />
        <meta name="twitter:description" content={proyecto.description} />
        {proyecto.image_url && (
          <meta name="twitter:image" content={proyecto.image_url} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <section className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">{proyecto.title}</h1>

        {proyecto.image_url && (
          <img
            src={proyecto.image_url}
            alt={proyecto.title}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}

        <article className="text-lg text-gray-700 mb-6">
          <p>{proyecto.description}</p>
        </article>

        {proyecto.link && (
          <a
            href={proyecto.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Ver Proyecto Externo
          </a>
        )}
      </section>
    </>
  );
}
