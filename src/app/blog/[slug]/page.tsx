// src/app/blog/[slug]/page.tsx
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

// Genera rutas estáticas para los slugs
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
    const posts: Post[] = await res.json();

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error al generar rutas estáticas:", error);
    return [];
  }
}

// Página dinámica de detalle del post
type PostDetailPageProps = {
  params: {
    slug: string;
  };
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
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
