'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importa los estilos CSS de AOS

const AosInit = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en milisegundos
      easing: 'ease-in-out', // Efecto de la animación
      once: true, // Si quieres que las animaciones solo ocurran una vez
    });
  }, []);

  return null;
};

export default AosInit;
