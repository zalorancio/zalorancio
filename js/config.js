/* =========================================================================
   config.js  —  ARCHIVO EDITABLE
   Datos generales del sitio: mail, redes sociales y rutas de las imágenes.
   Todo lo que está acá se puede cambiar sin saber programar.
   Regla única: no borres las comillas " " ni las comas , del final.
   ========================================================================= */

const CONFIG = {

  /* =======================================================================
     TU MAIL DE CONTACTO
     Es el que se muestra en la página principal y el que se copiá
     al portapapeles cuando alguien hace click en el botón "Contact".
     ---------------------------------------------------------------------
     PROVISIONAL: cambiar por el mail real.
     ======================================================================= */
  mail: "zalorancio@gmail.com",


  /* =======================================================================
     REDES SOCIALES  (columna de iconos de la página principal)
     ---------------------------------------------------------------------
     Cada bloque { ... } es un icono. Para cambiar el usuario o el link,
     editá "usuario" y "url".
     Para SACAR una red: borra su bloque entero (desde { hasta },).
     Para AGREGAR una red: copiá un bloque, pegalo abajo y cambia los datos.
     ---------------------------------------------------------------------
     nombre  = cómo se llama la red (aparece en el cartelito del mouse)
     usuario = tu arroba (aparece en el cartelito del mouse)
     url     = el link que se abre al hacer click (se abre en otra pestaña)
     icono   = la imagen del icono. Si querés usar un PNG tuyo, guardalo en
               img/iconos/ y escribí acá "./img/iconos/tu-archivo.png"
     ---------------------------------------------------------------------
     PROVISIONAL: los usuarios y links son inventados.
     ======================================================================= */
  redes: [
    {
      nombre:  "YouTube",
      usuario: "@zalorancio",
      url:     "https://www.youtube.com/@zalorancio",
      icono:   "./img/iconos/youtube.svg",
    },
    {
      nombre:  "Instagram",
      usuario: "@zalorancio",
      url:     "https://www.instagram.com/zalorancio",
      icono:   "./img/iconos/instagram.svg",
    },
    {
      nombre:  "X",
      usuario: "@zalorancio",
      url:     "https://x.com/zalorancio",
      icono:   "./img/iconos/x.svg",
    },
    {
      nombre:  "Twitch",
      usuario: "@zalorancio",
      url:     "https://www.twitch.tv/zalorancio",
      icono:   "./img/iconos/twitch.svg",
    },
  ],


  /* =======================================================================
     LINK DE INSTAGRAM PARA PEDIR COMISIONES
     Es el botón grande del final de la página Commissions.
     ======================================================================= */
  instagram: "https://www.instagram.com/zalorancio",


  /* =======================================================================
     IMÁGENES DEL SITIO
     ---------------------------------------------------------------------
     Guardá tus archivos en la carpeta que dice cada línea, con ESE nombre,
     y aparecen solos. Si el archivo todavía no existe, la página muestra
     un recuadro punteado con el nombre del archivo que falta.

     GIF: cualquier imagen puede ser un GIF (animado o no). Guardalo con el
     mismo nombre pero terminado en .gif (ej. personaje-banner.gif) y la
     página lo encuentra sola, sin cambiar nada acá. Lo mismo con .jpg.
     Si preferís otro nombre o otra extensión (.png, .jpg, .svg),
     cambiá la ruta acá y listo.
     ======================================================================= */
  imagenes: {
    // Ilustración del personaje, arriba a la izquierda del banner
    personaje:  "./img/logo/personaje-banner.png",

    // Logo con el texto grande "ZALORANCIO"
    logo:       "./img/logo/zalorancio-logo.png",

    // Texto chico de abajo: "2d rough animation"
    subtitulo:  "./img/logo/zalorancio-subtitulo.png",

    // Iconos chicos de los botones
    maletin:    "./img/iconos/maletin.svg",   // botón PORTFOLIO
    lapiz:      "./img/iconos/lapiz.svg",     // botón COMMISSIONS
    sobre:      "./img/iconos/sobre.svg",     // botón Contact

    // Logos de las formas de pago (página Commissions)
    paypal:      "./img/iconos/paypal-logo.jpg",
    mercadopago: "./img/iconos/Mercadopago.png",
  },

};
