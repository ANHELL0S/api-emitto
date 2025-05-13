import { FACTORY_INFO } from '@/shared/constants/factory-info'

export const generateWelcomeMessage = (name: string) => {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4; /* Fondo neutro y suave */
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            background-color: #ffffff; /* Fondo blanco limpio */
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            text-align: center;
          }
          h1 {
            color: #333333; /* Gris oscuro para el texto principal */
            font-size: 28px;
            margin-bottom: 20px;
          }
          p {
            font-size: 16px;
            color: #555555; /* Gris medio para el texto */
            line-height: 1.6;
            margin: 15px 0;
          }
          .btn {
            display: inline-block;
            background-color: #313131;
            color: #ffffff !important; /* Forzar el color blanco en el texto del botón */
            padding: 15px 30px;
            border-radius: 30px;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
            transition: background-color 0.3s ease;
            margin-top: 25px;
            box-shadow: 0 5px 15px rgba(0, 123, 255, 0.2);
          }
          .btn:hover {
            background-color: #252525;
          }
          .header {
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #eeeeee;
            margin-bottom: 30px;
          }
          .header img {
            width: 200px;
            margin-bottom: 15px;
          }
          .hero-image {
            width: 100%;
            max-width: 500px;
            border-radius: 10px;
            margin-top: 20px;
          }
          .footer {
            font-size: 12px;
            color: #888888;
            text-align: center;
            margin-top: 40px;
          }
          .footer a {
            color: #007bff;
            text-decoration: none;
          }
          .footer p {
            margin: 5px 0;
          }
        </style>
      </head>
      
      <body>
        <div class="container">
          <div class="header">
            <img src="https://static-00.iconduck.com/assets.00/send-icon-512x505-rfnsb0it.png" alt="Emitto Logo" />
            <h1>¡Hola ${name}!</h1>
          </div>
          
          <p>Bienvenido a <strong>${FACTORY_INFO.NAME}</strong>, la plataforma de email marketing que estabas buscando para potenciar tu negocio.</p>
          <p>Gracias por confiar en nosotros. Con nuestra herramienta podrás crear, programar y analizar el rendimiento de tus envíos masivos de manera sencilla y efectiva.</p>
          
          <a href="${FACTORY_INFO.DOMAIN}" class="btn">Comenzar ahora</a>

          <div class="footer">
            <p>¿Necesitas ayuda? <a href="emitto:soporte@mailmaster.com">Nuestro equipo está listo para asistirte</a>.</p>
            <p>© 2025 ${FACTORY_INFO.NAME} | ${FACTORY_INFO.DESCRIPTION}</p>
          </div>
        </div>
      </body>
    </html>
  `
}
