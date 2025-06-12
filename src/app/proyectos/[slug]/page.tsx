import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Proyecto {
  id: number;
  title: string;
  description: string;
  slug: string;
  image_url: string;
}

async function getProyecto(slug: string): Promise<Proyecto | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    cache: "no-store",
  });
  if (!res.ok) return [];

  const proyectos: Proyecto[] = await res.json();
  return proyectos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const proyecto = await getProyecto(params.slug);

  if (!proyecto) {
    return { title: "Proyecto no encontrado" };
  }

  return {
    title: proyecto.title,
    description: proyecto.description,
  };
}

type Props = {
  params: { slug: string };
};

const ProyectoDetailPage = async ({ params }: Props) => {
  const proyecto = await getProyecto(params.slug);

  if (!proyecto) {
    notFound();
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
};

export default ProyectoDetailPage;
