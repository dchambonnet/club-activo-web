/*
 * CONTENIDO DEL SITIO — edita solo este archivo para cambiar textos, comités, junta y contactos.
 * (Los eventos y documentos del Club se administran desde Supabase.)
 */
window.CLUB = {
  nombre: "Club Activo 20-30 de Panamá",
  email: "info@activo20-30.org",
  telefono: "+507 270-2030",
  telefonoHref: "+5072702030",
  direccion: "Calle 73, San Francisco, Panamá, Panamá",
  horarioCorto: "Lun–Vie 8:00 a.m.–5:00 p.m. · Sáb 8:00 a.m.–12:00 m.d.",
  horario: "Lunes a viernes de 8:00 a.m. a 5:00 p.m. · Sábados de 8:00 a.m. a 12:00 m.d.",

  teletonUrl: "https://www.teleton.com/",
  transparenciaUrl: "https://www.teleton.com/transparencia",

  // ⚠️ Verifica que cada enlace abra el perfil correcto. Deja la url "" para ocultar una red.
  redes: {
    instagram: { label: "activo2030panama",     url: "https://www.instagram.com/activo2030panama/" },
    facebook:  { label: "Teleton2030Panama",    url: "https://www.facebook.com/Teleton2030Panama" },
    x:         { label: "teleton2030",          url: "https://x.com/teleton2030" },
    youtube:   { label: "clubactivo2030panama", url: "https://www.youtube.com/@clubactivo2030panama" }
  },

  cita: "Uno nunca se enaltece tanto como cuando se arrodilla para ayudar a un niño.",
  lema: "La juventud, para ser servida, debe servir.",

  quienesSomos: [
    "Somos un club cívico que reúne a socios de entre 20 y 39 años que, de forma voluntaria, dedican su tiempo a distintas actividades al servicio de la comunidad y, en especial, de la niñez.",
    "Cada año desarrollamos la Teletón 20-30, un evento de recaudación de fondos para obras sociales, televisado durante más de 27 horas seguidas.",
    "La Teletón 20-30 ha desarrollado más de 40 proyectos meta e incluido el apoyo a múltiples fundaciones como Fanlyc y Nutre Hogar.",
    "Nuestro principal compromiso se consolida cada año en proyectos que responden a las necesidades de niños del país que viven en familias de escasos recursos."
  ],

  mision: [
    "Formar líderes para el servicio de la comunidad.",
    "Servir a la comunidad y, en especial, a la niñez.",
    "Desarrollar la amistad y promover la confraternidad entre sus miembros.",
    "Fomentar los más altos principios humanos, morales y cívicos."
  ],
  vision: "Ofrecer una nueva fuente de interés e incentivos para el socio individual: interesarse en la superación de su comunidad y de su nación, así como en el mejoramiento de la salud y las condiciones de vida de la infancia que le rodea, logrando su superación personal y el desarrollo de su carácter, convirtiéndose así en un mejor ciudadano y en una mejor persona con quien convivir.",

  categorias: {
    salud: "Salud",
    educacion: "Educación y valores",
    colectas: "Colectas y donaciones",
    comunidad: "Comunidad y ambiente",
    club: "Vida del Club"
  },

  /*
   * Listado de comités. Textos tomados de la página oficial del Club (resumidos).
   * ⚠️ "Donación de Sangre", "Calzando Sueños" y "Encuentro de Ideas" no aparecían en esa página:
   *    su descripción es borrador, valídala con la directiva.
   */
  comites: [
    { nombre: "Teletón 20-30", cat: "salud", icono: "❤️",
      desc: "El evento de recaudación de fondos más relevante del Club para obras sociales: un espectáculo de presentaciones artísticas transmitido en cadena nacional durante un mínimo de 27 horas continuas." },
    { nombre: "Vacunatón 20-30", cat: "salud", icono: "💉",
      desc: "En 2020 y 2021, en plena pandemia de COVID-19, se aplicaron más de 530 mil dosis de vacunas: cerca del 10% de todas las aplicadas en el país." },
    { nombre: "Giras Médicas", cat: "salud", icono: "🩺",
      desc: "Atención médica y medicamentos para residentes de comunidades de difícil acceso: odontología, oftalmología, ginecología, pediatría y medicina general." },
    { nombre: "Donación de Sangre", cat: "salud", icono: "🩸",
      desc: "Jornadas de donación para abastecer los bancos de sangre y salvar vidas." },
    { nombre: "Emergencias", cat: "salud", icono: "🚨",
      desc: "Movilización de todo el equipo del Club frente a emergencias y situaciones que requieren apoyo social." },

    { nombre: "Becas escolares Elisabeth Sáenz", cat: "educacion", icono: "🎓",
      desc: "Desde 1995 benefician a niños y jóvenes de escasos recursos con desempeño escolar sobresaliente. Llevan el nombre de Elisabeth Sáenz, niña símbolo de la Teletón de 1983." },
    { nombre: "Bolsas Escolares", cat: "educacion", icono: "🎒",
      desc: "Desde 1975 entregan cientos de bolsas con cuadernos, lápices y otros útiles a estudiantes de primaria, premedia y media de todo el país." },
    { nombre: "Librotón", cat: "educacion", icono: "📚",
      desc: "Junto a Tremenda Nota de Medcom, recolecta durante un mes libros donados por el pueblo panameño para llevarlos a niños donde la tecnología aún no llega." },
    { nombre: "Pro Valores", cat: "educacion", icono: "🌟",
      desc: "Promueve el respeto, la tolerancia, la solidaridad, la inclusión y la honradez para una sociedad culta y de convivencia pacífica." },
    { nombre: "Concurso de Pintura 20-30", cat: "educacion", icono: "🎨",
      desc: "Desde 1973 fomenta la creatividad de la niñez y la juventud panameña con un concurso anual en el que se premia a niños y adolescentes." },

    { nombre: "Lechetón 20-30", cat: "colectas", icono: "🥛",
      desc: "La mayor colecta de leche del país: beneficia a miles de niños, niñas y adultos mayores en más de 50 hogares e instituciones, junto a todos los Clubes Activos 20-30." },
    { nombre: "Gran Colecta de Pañales 20-30", cat: "colectas", icono: "👶",
      desc: "Desde 2010 beneficia a hospitales y centros de salud de áreas rurales y del interior, y dona a comunidades en extrema pobreza durante las giras médicas." },
    { nombre: "Ropatón 20-30", cat: "colectas", icono: "👕",
      desc: "Recibe ropa limpia y en buen estado, abrigos y frazadas, y las organiza según la institución que las recibirá, incluidas las que atienden desastres naturales." },
    { nombre: "Calzando Sueños", cat: "colectas", icono: "👟",
      desc: "Donamos calzado a niños y niñas para que den cada paso con dignidad." },

    { nombre: "Pro-Ecología", cat: "comunidad", icono: "🌱",
      desc: "Actividades por el ambiente junto a la Alcaldía de Panamá: Día de la Tierra (22 de abril), Día del Medio Ambiente (5 de junio) y acciones por océanos y recursos naturales." },
    { nombre: "Fiestas Tradicionales", cat: "comunidad", icono: "🎉",
      desc: "Nacieron en 1955 como la Fiesta de Navidad y hoy incluyen la Fiesta del Día del Niño y celebraciones en el INMFRE, Ciudad del Niño y la Casa Hogar de MINJUMNFA." },
    { nombre: "Momentos 20-30", cat: "comunidad", icono: "🤝",
      desc: "Cada mes visita a un niño con alguna discapacidad y le brinda apoyo con terapias, implementos y mucho más. Te invitamos a sumarte y compartirlo." },

    { nombre: "Comité Auxiliar de Damas 20-30 de Panamá", cat: "club", icono: "💐",
      desc: "Conformado por las esposas de los socios: apoya a familias de niños con cáncer y en pobreza extrema, hace fiestas en Fanlyc y reparte canastillas a recién nacidos." },
    { nombre: "Encuentro de Ideas 20-30", cat: "club", icono: "💡",
      desc: "Espacio de formación, liderazgo e intercambio de ideas entre socios." }
  ],


  /* ---------- Impacto (cifras tomadas de la página oficial del Club; revisar vigencia) ---------- */
  impacto: [
    { n: 40,  pre: "+", suf: "",     label: "proyectos meta desarrollados por la Teletón 20-30" },
    { n: 530, pre: "",  suf: " mil", label: "dosis de vacunas aplicadas en 2020 y 2021 con la Vacunatón" },
    { n: 50,  pre: "+", suf: "",     label: "hogares e instituciones beneficiados por la Lechetón" },
    { n: 19,  pre: "",  suf: "",     label: "comités al servicio de la comunidad", auto: true }
  ],

  /* ---------- Historia (hitos tomados de la página oficial y de prensa; validar con la directiva) ---------- */
  historia: [
    { anio: "1955", titulo: "Nace la Fiesta de Navidad",
      texto: "Una fiesta para niños de hospitales y orfanatos que luego se diversificó en las Fiestas Tradicionales del Club." },
    { anio: "1973", titulo: "Primer Concurso de Pintura",
      texto: "Comienza el concurso anual que fomenta la creatividad de la niñez y la juventud panameña." },
    { anio: "1975", titulo: "Bolsas Escolares",
      texto: "El Comité de Ayuda Escolar empieza a entregar bolsas con útiles a estudiantes de todo el país." },
    { anio: "1981", titulo: "Primeras Teletones",
      texto: "Las Teletones de 1981 y 1982 impulsan el centro de rehabilitación que hoy es referencia en la región." },
    { anio: "1983", titulo: "Elisabeth Sáenz, niña símbolo",
      texto: "Su historia inspira las becas a la excelencia académica que llevan su nombre." },
    { anio: "1995", titulo: "Becas escolares Elisabeth Sáenz",
      texto: "Comienzan a apoyar cada año a jóvenes de escasos recursos con desempeño sobresaliente." },
    { anio: "2010", titulo: "Gran Colecta de Pañales",
      texto: "Nace la colecta que beneficia a hospitales y centros de salud de áreas rurales y del interior." },
    { anio: "2020–2021", titulo: "Vacunatón 20-30",
      texto: "En plena pandemia se aplican más de 530 mil dosis, cerca del 10% de las aplicadas en el país." }
  ],

  /* ---------- Cómo funciona (transparencia) ---------- */
  pasos: [
    { t: "Seleccionamos", d: "Cada edición de la Teletón define un Proyecto Meta para la niñez y las comunidades." },
    { t: "Recaudamos",    d: "La Teletón 20-30 reúne las donaciones del público y de empresas aliadas." },
    { t: "Ejecutamos",    d: "La Fundación 20-30 ejecuta los proyectos y las ayudas con esos fondos." },
    { t: "Rendimos cuentas", d: "La información financiera es pública y puedes consultarla en cualquier momento." }
  ],

  /* ---------- Cómo donar (las donaciones se hacen en teleton.com) ---------- */
  donar: [
    { ico: "💳", t: "Tarjeta",       d: "Con Visa o Mastercard, desde la página oficial de la Teletón." },
    { ico: "📱", t: "Yappy",         d: "Dona desde tu app y confirma el beneficiario antes de pagar." },
    { ico: "🏦", t: "Transferencia", d: "Con los datos de la cuenta oficial publicados en teleton.com." }
  ],
  donarAviso: "El Club y la Teletón no solicitan claves ni datos completos de tarjeta por mensaje. Dona únicamente desde teleton.com.",

  /* Galería (opcional): guarda las fotos junto a index.html y agrégalas aquí. Si queda vacía, la sección no se muestra.
     Ejemplo: { src: "foto1.jpg", alt: "Entrega de bolsas escolares" } */
  galeria: [],

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
