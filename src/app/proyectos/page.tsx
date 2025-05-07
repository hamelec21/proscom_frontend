"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import UltimosPosts from "@/components/UltimosPosts";

// Define la interfaz Proyecto para evitar el uso de "any"
interface Proyecto {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url?: string;
  link?: string;
}

const PROYECTOS_POR_PAGINA = 9;

const TodosLosProyectos = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]); // Usa la interfaz Proyecto
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para obtener los proyectos
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
        if (!response.ok) {
          throw new Error("Error al obtener los proyectos");
        }
        const data = await response.json();
        setProyectos(data);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  // Filtrado de proyectos por título
  const filteredProyectos = proyectos.filter((proyecto) =>
    proyecto.title?.toLowerCase().includes(search.toLowerCase())
  );

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredProyectos.length / PROYECTOS_POR_PAGINA);

  // Paginación
  const paginatedProyectos = filteredProyectos.slice(
    (currentPage - 1) * PROYECTOS_POR_PAGINA,
    currentPage * PROYECTOS_POR_PAGINA
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Cargando
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
        <title>Proyectos</title>
        <meta name="description" content="Conoce nuestros proyectos realizados con éxito." />
      </Head>

      <section id="proyectos" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Proyectos Realizados</h2>
          <p className="text-lg mb-8 text-gray-600">
            Conoce algunos de nuestros proyectos destacados.
          </p>

          {/* Filtro de búsqueda */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Buscar por título..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Resetea a la primera página al buscar
              }}
              className="border px-3 py-2 rounded w-full md:w-1/2"
            />
          </div>

          {/* Mostrar mensaje si no se encuentran proyectos */}
          {filteredProyectos.length === 0 && search && (
            <p className="text-lg text-red-500 mb-8">
              No se encontraron proyectos con ese título.
            </p>
          )}

          {/* Muestra los proyectos en formato de cuadrícula */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProyectos.map((proyecto) => (
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
                  <h3 className="text-xl font-semibold mb-4">{proyecto.title}</h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {proyecto.description}
                  </p>
                  <div className="flex flex-col gap-2 md:flex-row md:justify-between">
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
                      href={`/proyectos/${proyecto.slug}`}
                      className="inline-block px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          {filteredProyectos.length > 0 && (
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
      <section id="blog" className="py-20 px-6 bg-gray-100">
        <UltimosPosts />
      </section>
    </>
  );
};

export default TodosLosProyectos;
