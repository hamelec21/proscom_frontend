import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  recaptchaToken: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, message, recaptchaToken }: ContactFormData =
      await req.json();

    // 1. Verificar reCAPTCHA con Google
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";

    const recaptchaRes = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return new Response(
        JSON.stringify({ message: "Falló la verificación de reCAPTCHA" }),
        {
          status: 400,
        }
      );
    }

    // 2. Configurar y enviar el correo
    const transporter = nodemailer.createTransport({
      service: "gmail", // O tu proveedor SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // 👈 usar el correo autenticado
      to: "tucorreo@dominio.com", // Cambia al destinatario final
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Correo enviado con éxito" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor" }),
      {
        status: 500,
      }
    );
  }
}
