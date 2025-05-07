import React from "react";


import TodosLosPosts from "@/components/TodosLosPosts";// Importar el nuevo componente

export default function Blog() {
  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 py-12">
        {/* Aquí estamos usando el componente que muestra todos los posts */}
        <TodosLosPosts />
      </section>
    </main>
  );
}
