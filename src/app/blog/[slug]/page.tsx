import { notFound } from "next/navigation";
import { ShareButton } from "@/components/ShareButton";

// Interfaz del post
interface Post {
  id: number;
  title: string;
  body: string;
  image_url?: string;
  excerpt: string;
  slug: string;
}

// Limpia etiquetas <p> del contenido HTML
function cleanBody(body: string): string {
  return body.replace(/<\/?p>/g, "");
}

// Obtiene un post específico por su slug
async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`, {
      next: { revalidate: 60 }, // ISR
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Error al obtener el post:", error);
    return null;
  }
}

// Página dinámica de detalle del post
export default async function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // El valor de 'params' ya está disponible, no es necesario 'await'
  const { slug } = params;

  // Obtiene el post según el slug
  const post = await getPost(slug);

  if (!post) {
    notFound(); // Si no se encuentra el post, redirige a la página 404
    return null;
  }

  const cleanContent = cleanBody(post.body);

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>

      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-[628px] object-cover rounded mb-6"
        />
      )}

      <article
        className="text-lg text-gray-700 mb-6 prose prose-lg max-w-none text-justify"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />

      <ShareButton title={post.title} excerpt={post.excerpt} slug={post.slug} />
    </section>
  );
}
