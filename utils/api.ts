// /utils/api.ts

export async function fetchProyecto(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`);
    if (!response.ok) {
      throw new Error('Proyecto no encontrado');
    }
    const proyecto = await response.json();
    return proyecto;
  } catch (error) {
    console.error("Error al obtener proyecto:", error);
    throw new Error('Error al obtener los datos del proyecto');
  }
}
