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
      { question: "¿Cómo escanear botellas?", answer: "Abre la app y muestra el QR a la máquina para iniciar sesión, luego escanea las botellas en la cámara de la máquina y recibe tus puntos." },
      { question: "¿Cuántos puntos vale una botella?", answer: "Depende del tipo, pero usualmente entre 5 y 10 puntos." }
    ],
  },
  {
    key: "recompensas",
    title: "Recompensas y Canje",
    icon: "🎁",
    faqs: [
      { question: "¿Cómo canjeo mis puntos?", answer: "Ve a la sección de recompensas y elige una disponible." },
      { question: "¿Cuánto tiempo tengo para canjear mis puntos?", answer: "Los puntos son válidos por un año desde que se acumulan." }
    ],
  },
  {
    key: "general",
    title: "Preguntas Generales",
    icon: "♻️",
    faqs: [
      { question: "¿Qué tipo de botellas puedo reciclar?", answer: "Puedes reciclar botellas plásticas PET de 500ml transparentes y de colores, siempre limpias y sin tapa." },
      { question: "¿Dónde están ubicadas las máquinas de reciclaje?", answer: "Las máquinas están ubicadas en centros comerciales, parques y Universidades." },
      { question: "¿Cómo sé cuántos puntos tengo acumulados?", answer: "Puedes consultar tu saldo de puntos en la app o en la pantalla de la máquina después de escanear tus botellas." },
      { question: "¿Qué puedo obtener con mis puntos?", answer: "Puedes canjear tus puntos por productos ecológicos y descuentos en tiendas asociadas." }
    ],
  },
];

export default categories;
