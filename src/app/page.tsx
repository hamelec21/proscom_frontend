"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import AosInit from "@/components/AosInit";
import UltimosPosts from "@/components/UltimosPosts";
import UltimosProyectos from "@/components/UltimosProyectos";
import Clientes from "@/components/ClientLogos";
import Link from "next/link";
import { useState, useEffect } from "react";

const Slider = dynamic(() => import("@/components/Slider"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout); // limpieza
  }, []);

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
        <title>Inicio | Proscom</title>
        <meta
          name="description"
          content="Proscom ofrece soluciones tecnológicas y en ciberseguridad para emprendedores, startups y empresas. Servicios de desarrollo de software, consultoría y más."
        />
        <meta
          name="keywords"
          content="tecnología, ciberseguridad, software, desarrollo, consultoría, startups, emprendedores, soluciones digitales"
        />
        <meta name="author" content="Proscom" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Inicio | Proscom" />
        <meta
          property="og:description"
          content="Proscom ofrece soluciones tecnológicas y en ciberseguridad para emprendedores, startups y empresas. Servicios de desarrollo de software, consultoría y más."
        />
        <meta property="og:image" content="/img/og-image.jpg" />
        <meta property="og:url" content="https://proscom.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Inicio | Proscom" />
        <meta
          name="twitter:description"
          content="Proscom ofrece soluciones tecnológicas y en ciberseguridad para emprendedores, startups y empresas. Servicios de desarrollo de software, consultoría y más."
        />
        <meta name="twitter:image" content="/img/twitter-image.jpg" />
      </Head>

      <main className="min-h-screen">
        <AosInit />

        {/* Slider principal */}
        <section className="relative">
          <Slider />
        </section>

        {/* Sección de bienvenida */}
        <section className="relative bg-cover bg-center bg-no-repeat py-20 px-6 text-gray-600 bg-gray-100">
          <div className="absolute inset-0 bg-opacity-60" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <header>
              <h1 className="text-2xl lg:text-4xl md:text-5xl font-bold mb-6">
                ¡Bienvenido a Proscom!
              </h1>
            </header>
            <p className="text-lg md:text-xl mb-8 leading-relaxed text-justify">
              En Proscom, creemos que cada proyecto nace de una idea poderosa, una visión que merece avanzar con seguridad, confianza y respaldo real. Somos una empresa especializada en desarrollo tecnológico y soluciones en ciberseguridad, creada para acompañar a emprendedores, startups y empresas en la construcción de su futuro digital sin poner en riesgo lo más importante: su información, su reputación y su crecimiento.
            </p>

            <div className="flex justify-center">
              <Link href="/nosotros" aria-label="Conocer más sobre nosotros">
                <button className="mt-4 px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-lg transition duration-300">
                  Conoce más sobre nosotros
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Sección ¿Por qué elegirnos? */}
        <section
          className="relative bg-cover bg-center bg-no-repeat py-20 px-6 text-[#2c3e50]"
          style={{ backgroundImage: "url('/img/banner-home.jpg')" }}
          data-aos="fade-right"
          aria-label="Razones para elegir Proscom"
        >
          <div className="absolute inset-0 bg-[#bdc3c7] bg-opacity-60" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <header>
              <h2 className="text-2xl lg:text-4xl font-bold mb-6">
                ¿Por qué elegir Proscom?
              </h2>
            </header>
            <p className="text-lg md:text-xl leading-relaxed text-[#2c3e50] text-justify">
              En <strong>Proscom</strong>, entendemos que cada negocio es único. Por eso, ofrecemos soluciones digitales diseñadas a medida, alineadas a tus objetivos y procesos.
              <br className="hidden md:block" />
              Nuestro equipo combina innovación, seguridad y experiencia para ayudarte a crecer de forma sostenible y confiable.
              <br className="hidden md:block" />
              Desde el desarrollo de software hasta la consultoría tecnológica, estamos aquí para llevar tu empresa al siguiente nivel con herramientas inteligentes y un enfoque humano.
            </p>

            <div className="flex justify-center">
              <Link href="/servicios" aria-label="Conoce nuestros servicios">
                <button className="mt-10 px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-lg transition duration-300">
                  Conoce nuestros servicios
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Sección de últimos posts del blog */}
        <section id="blog" className="py-20 px-6 bg-gray-100">
          <UltimosPosts />
        </section>

        {/* Sección de últimos proyectos */}
        <section id="proyectos" className="py-20 px-6 bg-white">
          <UltimosProyectos />
        </section>

        {/* Clientes */}
        <section id="clientes" className="py-20 px-6 bg-gray-100">
          <div className="max-w-6xl mx-auto text-center">
            <Clientes />
          </div>
        </section>
      </main>
    </>
  );
}
