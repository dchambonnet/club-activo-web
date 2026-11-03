/*
 * CONTENIDO DEL SITIO — edita solo este archivo para cambiar textos, comités, junta y contactos.
 * (Los eventos y documentos de transparencia se administran desde Supabase.)
 */
window.CLUB = {
  nombre: "Club Activo 20-30 de Panamá",
  email: "info@activo20-30.org",

  // TODO: reemplazar por el enlace oficial de la página de la Teletón 20-30
  teletonUrl: "https://REEMPLAZAR-CON-URL-DE-TELETON",

  // Deja "" en las redes que no existan: no se mostrarán.
  redes: {
    instagram: "",
    facebook: "",
    x: "",
    youtube: "",
    tiktok: ""
  },

  categorias: {
    salud: "Salud",
    educacion: "Educación y valores",
    colectas: "Colectas y donaciones",
    comunidad: "Comunidad y ambiente",
    club: "Vida del Club"
  },

  /*
   * Listado de comités (según el listado compartido por la directiva).
   * ⚠️ Las descripciones son BORRADOR: validar con cada comité y con la directiva antes de publicar.
   */
  comites: [
    { nombre: "Teletón 20-30", cat: "salud", icono: "❤️",
      desc: "Nuestra gran campaña nacional anual a favor de la niñez y de las personas con discapacidad, alrededor de un Proyecto Meta." },
    { nombre: "Vacunatón 20-30", cat: "salud", icono: "💉",
      desc: "Jornadas para acercar la vacunación a las familias y promover la salud preventiva." },
    { nombre: "Giras Médicas", cat: "salud", icono: "🩺",
      desc: "Llevamos atención médica a comunidades de difícil acceso junto a profesionales voluntarios." },
    { nombre: "Donación de Sangre", cat: "salud", icono: "🩸",
      desc: "Jornadas de donación para abastecer los bancos de sangre y salvar vidas." },
    { nombre: "Emergencias", cat: "salud", icono: "🚨",
      desc: "Respuesta solidaria ante emergencias y desastres que afectan a las comunidades." },

    { nombre: "Becas escolares Elisabeth Sáenz", cat: "educacion", icono: "🎓",
      desc: "Becas para estudiantes con excelencia académica y necesidad de apoyo." },
    { nombre: "Bolsas Escolares", cat: "educacion", icono: "🎒",
      desc: "Entregamos útiles y bolsas escolares para que ningún niño empiece el año sin lo necesario." },
    { nombre: "Librotón", cat: "educacion", icono: "📚",
      desc: "Colecta de libros y material educativo para escuelas y bibliotecas del país." },
    { nombre: "Pro Valores", cat: "educacion", icono: "🌟",
      desc: "Campañas que promueven valores cívicos y humanos en la niñez y la juventud." },
    { nombre: "Concurso de Pintura 20-30", cat: "educacion", icono: "🎨",
      desc: "Un espacio para que niños y jóvenes expresen su talento artístico." },

    { nombre: "Lechetón 20-30", cat: "colectas", icono: "🥛",
      desc: "Colecta nacional de leche para apoyar la nutrición de la niñez." },
    { nombre: "Gran Colecta de Pañales 20-30", cat: "colectas", icono: "👶",
      desc: "Reunimos pañales para bebés y adultos que dependen de ellos." },
    { nombre: "Ropatón 20-30", cat: "colectas", icono: "👕",
      desc: "Colecta y entrega de ropa en buen estado a familias que la necesitan." },
    { nombre: "Calzando Sueños", cat: "colectas", icono: "👟",
      desc: "Donamos calzado a niños y niñas para que den cada paso con dignidad." },

    { nombre: "Pro-Ecología", cat: "comunidad", icono: "🌱",
      desc: "Acciones de reciclaje, siembra y educación para cuidar nuestro ambiente." },
    { nombre: "Fiestas Tradicionales", cat: "comunidad", icono: "🎉",
      desc: "Celebraciones que llevan alegría y tradición panameña a niños y familias." },

    { nombre: "Comité Auxiliar de Damas 20-30 de Panamá", cat: "club", icono: "💐",
      desc: "Mujeres que acompañan y fortalecen la labor del Club en cada proyecto." },
    { nombre: "Momentos 20-30", cat: "club", icono: "🤝",
      desc: "Actividades de convivencia que fortalecen la amistad entre socios." },
    { nombre: "Encuentro de Ideas 20-30", cat: "club", icono: "💡",
      desc: "Espacio de formación, liderazgo e intercambio de ideas entre socios." }
  ],

  /*
   * Junta Directiva — reemplazar con los nombres oficiales vigentes.
   * Si agregas "foto": "assets/junta/nombre.jpg" se mostrará la foto; si no, se muestran las iniciales.
   */
  juntaPeriodo: "Periodo 2026-2027",
  junta: [
    { cargo: "Presidente",                       nombre: "Fabián Madrid",    foto: "" },
    { cargo: "1er Vicepresidente",               nombre: "Isaías Noriega",   foto: "" },
    { cargo: "2do Vicepresidente",               nombre: "Samuel Bardayan",  foto: "" },
    { cargo: "Tesorero",                         nombre: "Adrián Herrera",   foto: "" },
    { cargo: "Secretario",                       nombre: "Diego Vasquez",    foto: "" },
    { cargo: "Sargento de Armas",                nombre: "José Zambrano",    foto: "" },
    { cargo: "Director",                         nombre: "Nelson Bartoli",   foto: "" },
    { cargo: "Director",                         nombre: "Diego Boyd",       foto: "" },
    { cargo: "Director",                         nombre: "Andrés Vissuetti", foto: "" },
    { cargo: "Director",                         nombre: "Alberto Muñoz",    foto: "" },
    { cargo: "Presidente del periodo anterior",  nombre: "Danilo Pinto",     foto: "" }
  ],

  asuntosContacto: [
    "Solicitud de apoyo o donación",
    "Alianza o patrocinio",
    "Prensa y medios",
    "Quiero ser socio",
    "Otro tema"
  ]
};
