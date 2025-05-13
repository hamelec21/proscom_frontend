import { notFound } from "next/navigation";
import { ShareButton } from "@/components/ShareButton";
import type { Metadata } from "next";

// Interfaz del post
interface Post {
  id: number;
  title: string;
  body: string;
  image_url?: string;
  excerpt: string;
  slug: string;
}

// Limpia el contenido
function cleanBody(body: string): string {
  return body.replace(/<\/?p>/g, ""); // Elimina las etiquetas <p>
}

// Función que obtiene el post por slug
async function getPost(slug: string): Promise<Post | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

// ✅ SEO dinámico
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post no encontrado",
      description: "El contenido solicitado no existe.",
    };
  }

  const url = `${process.env.NEXT_PUBLIC_SHARE_URL}/blog/${post.slug}`;
  const image = post.image_url || `${process.env.NEXT_PUBLIC_SHARE_URL}/default-og.jpg`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

// Página de detalle del post
export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

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

      <ShareButton
        title={post.title}
        excerpt={post.excerpt}
        slug={slug}
        image={post.image_url}
      />
    </section>
  );
}
