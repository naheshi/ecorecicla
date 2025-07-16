// app/data/preguntasFrec.js

const categories = [
  {
    key: "cuenta",
    title: "Cuenta y Acceso",
    icon: "👤",
    faqs: [
      { question: "¿Cómo me registro o inicio sesión?", answer: "Puedes registrarte desde el sitio web..." },
      { question: "¿Qué hago si olvidé mi contraseña?", answer: "Usa la opción 'Olvidé mi contraseña' en el inicio de sesión." }
    ],
  },
  {
    key: "escaneo",
    title: "Escaneo de Botellas y Puntos",
    icon: "📷",
    faqs: [
      { question: "¿Cómo escanear botellas?", answer: "Abre el App y muestra el QR a la máquina para iniciar sesión, luego escanea las botellas en la camara de la máquina y recibe tus puntos." },
      { question: "¿Cuántos puntos vale una botella?", answer: "Depende del tipo, pero usualmente entre 5 y 10 puntos." }
    ],
  },
  {
    key: "recompensas",
    title: "Recompensas y Canje",
    icon: "🎁",
    faqs: [
      { question: "¿Cómo canjeo mis puntos?", answer: "Ve a la sección de recompensas y elige una disponible." }
    ],
  },
  {
    key: "consulta",
    title: "Realizar Consulta",
    icon: "❓",
    faqs: [
      { question: "¿Cómo enviar una consulta?", answer: "Desde la app, ve a 'Ayuda' y selecciona 'Realizar consulta'." }
    ],
  },
];

export default categories;
