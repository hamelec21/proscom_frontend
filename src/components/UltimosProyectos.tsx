"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

interface Proyecto {
  id: number;
  title: string;
  slug: string;
  excerpt: string; // 👈 Agregamos slug aquí
  description: string;
  image_url?: string;
  link?: string;
}

const UltimosProyectos: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Obtener proyectos
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los proyectos");
        }
        const data: Proyecto[] = await response.json();
        setProyectos(data);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  // Mostrar loader mientras carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader" />
      </div>
    );
  }

  // Filtrar los últimos 3 proyectos
  const ultimosProyectos = proyectos.slice(0, 3);

  return (
    <>
      <Head>
        <title>Últimos Proyectos</title>
        <meta
          name="description"
          content="Conoce nuestros últimos proyectos realizados."
        />
      </Head>

      <section id="ultimos-proyectos" className="py-10 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Últimos Proyectos</h2>
          <p className="text-lg mb-8 text-gray-600">
            Conoce nuestros últimos proyectos destacados.
          </p>

          {/* Mostrar los proyectos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ultimosProyectos.map((proyecto) => (
              <div
                key={proyecto.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden text-left"
              >
                {proyecto.image_url && (
                  <img
                    src={proyecto.image_url}
                    alt={`Imagen de ${proyecto.title}`}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {proyecto.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {" "}
                    {proyecto.excerpt.length > 60
                      ? `${proyecto.excerpt.slice(0, 60)}...`
                      : proyecto.excerpt}
                  </p>
                  <div className="flex flex-col gap-2 md:flex-row md:justify-between ">
                    {proyecto.link && (
                      <a
                        href={proyecto.link}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver externo
                      </a>
                    )}
                    <Link
                      href={`/proyectos/${proyecto.slug}`} // 👈 Ahora usa slug
                      className="inline-block px-4 py-2 bg-gray-800 text-center text-white rounded hover:bg-gray-900 transition w-full "
                    >
                      Ver Más
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/proyectos"
              className="px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg shadow-lg transition duration-300"
            >
              Ver todos los proyectos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default UltimosProyectos;
