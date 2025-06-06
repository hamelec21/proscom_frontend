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

function cleanBody(body: string): string {
  return body.replace(/<\/?p>/g, ""); // Elimina las etiquetas <p>
}

async function getPost(slug: string): Promise<Post | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

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
