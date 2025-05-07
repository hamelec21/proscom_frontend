"use client";

import { useState } from "react";

interface ShareButtonProps {
  title: string;
  excerpt: string;
  slug: string;
}

export function ShareButton({ title, excerpt, slug }: ShareButtonProps) {
  const [copied, setCopied] = useState(false); // Estado para controlar si la URL ha sido copiada

  const shareUrl = `${process.env.NEXT_PUBLIC_SHARE_URL}/blog/${slug}`; //url para compartir post

  console.log(shareUrl); // Imprime la URL generada en la consola

  // URLs de compartición para diferentes redes sociales
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(title)}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;
  const whatsappShare = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    title + " " + shareUrl
  )}`;

  // Función para copiar la URL al portapapeles
  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopied(true); // Actualiza el estado cuando la URL se ha copiado
        setTimeout(() => setCopied(false), 2000); // Restablece el estado después de 2 segundos
      })
      .catch((error) => {
        console.error("Error al copiar la URL:", error);
      });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-8">
      <a
        href={facebookShare}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
      >
        Facebook
      </a>

      <a
        href={twitterShare}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded transition"
      >
        X (Twitter)
      </a>

      <a
        href={linkedinShare}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition"
      >
        LinkedIn
      </a>

      <a
        href={whatsappShare}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
      >
        WhatsApp
      </a>

      {/* Botón para copiar la URL */}
      <button
        onClick={handleCopyUrl}
        className={`bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition ${
          copied ? "bg-green-500" : ""
        }`}
      >
        {copied ? "¡URL copiada!" : "Copiar URL"}
      </button>
    </div>
  );
}
