"use client";

import React, { useEffect, useState } from "react";

// Definir los tipos para los datos de cada post
interface Post {
  id: number;
  title: string;
  image_url?: string;
  excerpt: string;
  slug: string;
}

const UltimosPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);  // Tipo de posts como array de Post
  const [loading, setLoading] = useState<boolean>(true);  // Tipo de loading como booleano

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
        
        if (!response.ok) {
          throw new Error("Error al obtener los posts");
        }

        const data: Post[] = await response.json(); // Asegúrate de que la respuesta sea de tipo Post[]

        // Ordena los posts por id de manera descendente y luego toma los últimos 3
        setPosts(data.sort((a, b) => b.id - a.id).slice(0, 3));
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader" />
      </div>
    );
  }

  return (
    <section id="blog" className="py-10 px-0 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Nuestro Blog</h2>
        <p className="text-lg mb-8 text-gray-600">
          Lee nuestras últimas publicaciones y mantente actualizado sobre
          tendencias tecnológicas, ciberseguridad, y mucho más.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{post.title}</h3>
                <p className="text-gray-700 mb-4"> {post.excerpt.length > 65 ? `${post.excerpt.slice(0, 65)}...` : post.excerpt}</p>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  Leer más
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="/blog"
            className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-lg transition duration-300"
          >
            Ver todos los artículos
          </a>
        </div>
      </div>
    </section>
  );
};

export default UltimosPosts;
