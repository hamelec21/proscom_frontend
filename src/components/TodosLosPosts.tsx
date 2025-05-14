"use client"; // Indicamos que este es un componente cliente

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  image_url?: string;
  category_id: number;
  slug: string;
}

interface Category {
  id: number;
  name: string;
}

const POSTS_PER_PAGE = 12;

const TodosLosPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts`
        );
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchCategory =
      selectedCategory === "" || post.category_id === selectedCategory;
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Blog - Todos los Posts</title>
        <meta
          name="description"
          content="Lee todas nuestras publicaciones sobre tecnología, ciberseguridad y más."
        />
        <meta
          name="keywords"
          content="tecnología, ciberseguridad, blog, publicaciones, posts"
        />
      </Head>

      <section id="blog" className="py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Nuestro Blog</h2>
          <p className="text-lg mb-8 text-gray-600">
            Lee todas nuestras publicaciones y mantente actualizado sobre
            tendencias tecnológicas, ciberseguridad, y mucho más.
          </p>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <input
              type="text"
              placeholder="Buscar por título..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-3 py-2 rounded w-full md:w-1/2"
            />

            <select
              value={selectedCategory}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedCategory(value === "" ? "" : parseInt(value));
                setCurrentPage(1);
              }}
              className="border px-3 py-2 rounded w-full md:w-1/3"
            >
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sin resultados */}
          {filteredPosts.length === 0 && (
            <p className="text-lg text-red-500 mb-8">
              No se encontraron publicaciones con esos filtros.
            </p>
          )}

          {/* Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {post.image_url && (
                  <Image
                    src={post.image_url}
                    alt={`Imagen del post ${post.title}`}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                    unoptimized // Quita esto si usas dominio en next.config.js
                  />
                )}
                <div className="p-6 text-left">
                  <h3 className="text-xl font-semibold mb-4">{post.title}</h3>
                  <p className="text-gray-700 mb-4">
                    {post.excerpt.length > 65
                      ? `${post.excerpt.slice(0, 65)}...`
                      : post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Leer más
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Paginación */}
          {filteredPosts.length > 0 && (
            <div className="flex justify-center mt-10 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TodosLosPosts;
