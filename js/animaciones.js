/* =========================================================================
   animaciones.js  —  ARCHIVO EDITABLE
   La lista de videos de la página Portfolio.
   ---------------------------------------------------------------------
   CÓMO SACAR EL ID DE UN VIDEO DE YOUTUBE:
   Si el link es    https://www.youtube.com/watch?v=dQw4w9WgXcQ
   el ID es         dQw4w9WgXcQ      (lo que va después de  v= )

   Si el link es    https://youtu.be/dQw4w9WgXcQ
   el ID es         dQw4w9WgXcQ      (lo que va después de la barra)
   ========================================================================= */


/* =========================================================================
   1) EL DEMOREEL
   Es el video grande de arriba de todo en la página Portfolio.
   Para cambiarlo, pegá otro ID entre las comillas.
   ---------------------------------------------------------------------
   PROVISIONAL: es un video de ejemplo, cambialo por tu demoreel.
   ========================================================================= */
const DEMOREEL = {
  youtubeId: "5BPBtwZ9tUM",
};


/* =========================================================================
   2) TODAS LAS ANIMACIONES  ("All Animations")
   ---------------------------------------------------------------------
   Cada bloque { ... } es un video de la grilla.

   PARA AGREGAR UNA ANIMACION NUEVA:
     copiá un bloque entero (desde  {  hasta  },  incluida la coma)
     pegalo donde quieras de la lista
     y cambia título, fecha y youtubeId.

   PARA BORRAR UNA ANIMACION:
     borra su bloque entero, desde  {  hasta  },

   PARA REORDENAR:
     mové el bloque de lugar. El orden de esta lista es el orden
     en que se ven en la página: el primero de arriba aparece primero.

   No hay límite: si pones 40 bloques, se muestran 40.
   ---------------------------------------------------------------------
   PROVISIONAL: títulos, fechas e IDs son inventados, sólo para que se
   vea la grilla llena. Reemplazalos por tus videos reales.
   ========================================================================= */
const ANIMACIONES = [

  // ===== AGREGAR NUEVAS ANIMACIONES ACÁ ARRIBA (aparecen primero) =====

  {
    titulo:    "Bruja del super",       // <- título que se muestra, entre comillas
    fecha:     "Agosto 2026",       // <- fecha que se muestra al lado
    youtubeId: "sIbfPxIYP0A",      // <- ID del video de YouTube
    miniatura: "",                 // <- opcional, ver nota al final del archivo
  },
  {
    titulo:    "Acting ",
    fecha:     "Marzo 2026",
    youtubeId: "jKE2kb5ygMI",
    miniatura: "",
  },
  {
    titulo:    "Waving Practice Blue Lock fanart",
    fecha:     "Febrero 2026",
    youtubeId: "rqYOnWsPjTc",
    miniatura: "",
  },
  {
    titulo:    "Walk Cycle",
    fecha:     "Marzo 2026",
    youtubeId: "x0o_uwqc6fg",
    miniatura: "",
  },
  {
    titulo:    "Lipsync Trigun 1998",
    fecha:     "Abril 2026",
    youtubeId: "DGvUFiKWSo0",
    miniatura: "",
  },
  {
    titulo:    "waving Tigun 1998",
    fecha:     "Febrero 2026",
    youtubeId: "ORGPIIFZkCU",
    miniatura: "",
  },
  {
    titulo:    "Ñandu",
    fecha:     "Noviembre 2024",
    youtubeId: "clJIGY38NJs",
    miniatura: "",
  },
  {
    titulo:    "Acting and Lipsync",
    fecha:     "mayo 2026",
    youtubeId: "M_92PRB24l4",
    miniatura: "",
  },
  {
    titulo:    "ñandu pixelart",
    fecha:     "Abril 2026",
    youtubeId: "2TVAp9GQOhE",
    miniatura: "",
  },

];


/* =========================================================================
   NOTA SOBRE "miniatura"
   ---------------------------------------------------------------------
   Si lo dejás vacío  ->  ""            la página usa automáticamente la
                                        miniatura del video de YouTube.
   Si querés una imagen tuya (sirve .png, .jpg o .gif animado):
     1. guardala en la carpeta  img/animaciones/
     2. escribí la ruta acá, por ejemplo:
        miniatura: "./img/animaciones/mi-dibujo.jpg",
   ========================================================================= */
