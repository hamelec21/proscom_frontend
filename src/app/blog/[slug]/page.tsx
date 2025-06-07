// app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import { ShareButton } from "@/components/ShareButton";

interface Post {
  id: number;
  title: string;
  body: string;
  image_url?: string;
  excerpt: string;
  slug: string;
}

function cleanBody(body: string): string {
  return body.replace(/<\/?p>/g, ""); // Elimina las etiquetas <p>
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error al obtener el post:", error);
    return null;
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
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
        <Image
          src={post.image_url}
          alt={post.title}
          width={1200}
          height={628}
          className="w-full h-auto object-cover rounded mb-6"
          priority // Opcional: carga prioritaria para LCP rápido
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
