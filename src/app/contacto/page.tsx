'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!recaptchaToken) {
      setStatus('Por favor completa el reCAPTCHA.');
      return;
    }

    setIsSubmitting(true);
    setStatus('Enviando...');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      if (response.ok) {
        setStatus('¡Mensaje enviado con éxito!');
        setFormData({ name: '', email: '', message: '' });
        setRecaptchaToken('');
      } else {
        setStatus('Hubo un error al enviar el mensaje.');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error); // <--- Uso de `error`
      setStatus('Error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 text-center sm:text-left">Contacto</h2>
        <p className="text-lg text-gray-600 mb-8 text-center sm:text-left">
          Somos una empresa comprometida con la calidad.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label htmlFor="name" className="block text-lg">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md shadow-sm mt-2"
              />
            </div>
            <div className="flex-1 mt-4 sm:mt-0">
              <label htmlFor="email" className="block text-lg">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md shadow-sm mt-2"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-lg">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md shadow-sm mt-2"
              rows={6}
            ></textarea>
          </div>

          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => setRecaptchaToken(token || '')}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-800 text-white py-3 rounded-md mt-4 hover:bg-gray-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>

        {status && <p className="mt-6 text-center text-lg text-gray-700">{status}</p>}
      </section>
    </main>
  );
}
