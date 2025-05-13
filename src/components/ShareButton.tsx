"use client";

import { useState } from "react";
interface ShareButtonProps {
  title: string;
  excerpt: string;
  slug: string;
  image: string; // Añadido el prop para la imagen
}

export function ShareButton({ title, excerpt, slug, image }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${process.env.NEXT_PUBLIC_SHARE_URL}/blog/${slug}`;

  // URLs de compartir en redes sociales
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`${title} - ${excerpt}`)}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const whatsappShare = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n\n${excerpt}\n\n${shareUrl}`)}`;

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Error al copiar la URL:", error);
      });
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {/* Vista previa del contenido a compartir */}
      <div className="max-w-xl text-center bg-white shadow p-4 rounded">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{excerpt}</p>
        {/* Mostrar imagen */}
        {image && <img src={image} alt={title} className="mt-4 rounded" />}
      </div>

      {/* Botones de redes sociales */}
      <div className="flex flex-wrap gap-4 justify-center">
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

        <button
          onClick={handleCopyUrl}
          className={`bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition ${
            copied ? "bg-green-500" : ""
          }`}
        >
          {copied ? "¡URL copiada!" : "Copiar URL"}
        </button>
      </div>
    </div>
  );
}