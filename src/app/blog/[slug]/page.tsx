import { notFound } from "next/navigation";
import { ShareButton } from "@/components/ShareButton";

interface Post {
  id: number;
  title: string;
  body: string;
  image_url?: string;
  excerpt: string;
  slug: string;
}

// Función para limpiar las etiquetas <p> del body (si se desea)
function cleanBody(body: string): string {
  return body.replace(/<\/?p>/g, ""); // elimina solo las etiquetas <p> y </p>
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Error al obtener el post:", error);
    return null;
  }
}

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
}

export default function PostDetailPage({ post }: { post: Post }) {
  // Limpiar el contenido si es necesario
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

      {/* Renderizar el contenido del body */}
      <article
        className="text-lg text-gray-700 mb-6 prose prose-lg max-w-none text-justify"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />

      {/* Botón para compartir */}
      <ShareButton title={post.title} excerpt={post.excerpt} slug={post.slug} />
    </section>
  );
}
