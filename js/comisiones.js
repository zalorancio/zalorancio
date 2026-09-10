/* =========================================================================
   comisiones.js  —  ARCHIVO EDITABLE
   Las pestañas, las opciones y los precios de la página Commissions.
   =========================================================================

   *** IMPORTANTE SOBRE LOS PRECIOS ***
   Cada opción tiene DOS precios que escribís vos a mano y que no tienen
   ninguna relación entre sí:
       precioUSD  -> el número que se muestra en dólares
       precioARS  -> el número que se muestra en pesos
   El de pesos NO se calcula a partir del de dólares. No hay ningún tipo
   de cambio en el código. Vos ponés el número en pesos que quieras.

   Se escriben SIN puntos, SIN comas y SIN el símbolo $:
       precioARS: 15000        BIEN
       precioARS: 15.000       MAL
       precioARS: "$15000"     MAL
   Los puntos de miles los pone la página sola al mostrarlo.
   ========================================================================= */


/* =========================================================================
   1) EXTRA POR FONDO (Background)
   Cuando el visitante marca "Sí" en el recuadro Background, estos números
   se suman al precio de la opción elegida.
   Son montos fijos, no porcentajes.
   ---------------------------------------------------------------------
   PROVISIONAL: valores inventados.
   ========================================================================= */
const EXTRA_FONDO = {
  usd: 5,        // <- cuanto suma en dólares al marcar Background = Si
  ars: 5000,     // <- cuanto suma en pesos    al marcar Background = Si
};


/* =========================================================================
   2) LAS 4 PESTAÑAS Y SUS 3 OPCIONES CADA UNA
   ---------------------------------------------------------------------
   nombre = el texto que se ve en la pestaña o en el botón
   id     = se usa para armar el nombre del archivo de imagen.
            NO lo cambies salvo que también renombres las imágenes.

   La imagen de ejemplo de cada combinación se busca sola en:
       img/comisiones/ID-DEPESTAÑA - ID-DE-OPCION - confondo/sinfondo .png
   Por ejemplo:
       img/comisiones/icon-sketch-sinfondo.png
       img/comisiones/fullbody-color-confondo.png
   También sirve GIF (animado o no): guardalo con el mismo nombre pero
   terminado en .gif, por ejemplo  icon-sketch-sinfondo.gif
   La página prueba sola .png, .gif y .jpg, en ese orden.
   Mientras el archivo no exista se ve un recuadro punteado que dice
   qué nombre le tenés que poner.
   ---------------------------------------------------------------------
   PROVISIONAL: TODOS los precios de abajo son inventados.
   ========================================================================= */
const COMISIONES = [

  {
    nombre: "Icon",
    id: "icon",
    opciones: [
      { nombre: "Sketch",  id: "sketch",  precioUSD: 10, precioARS: 10000 },
      { nombre: "Lineart", id: "lineart", precioUSD: 15, precioARS: 15000 },
      { nombre: "Color",   id: "color",   precioUSD: 20, precioARS: 20000 },
    ],
  },

  {
    nombre: "Half body",
    id: "halfbody",
    opciones: [
      { nombre: "Sketch",  id: "sketch",  precioUSD: 20, precioARS: 20000 },
      { nombre: "Lineart", id: "lineart", precioUSD: 28, precioARS: 28000 },
      { nombre: "Color",   id: "color",   precioUSD: 35, precioARS: 35000 },
    ],
  },

  {
    nombre: "Full body",
    id: "fullbody",
    opciones: [
      { nombre: "Sketch",  id: "sketch",  precioUSD: 30, precioARS: 30000 },
      { nombre: "Lineart", id: "lineart", precioUSD: 40, precioARS: 40000 },
      { nombre: "Color",   id: "color",   precioUSD: 50, precioARS: 50000 },
    ],
  },

  {
    /* =====================================================================
       PESTAÑA GIF
       Funciona igual que las otras tres: 3 opciones.
       Solo que los nombres todavía no están definidos.
       *** RENOMBRA "Opcion1", "Opcion2" y "Opcion3" por los nombres
           que vos quieras. Cambiá sólo lo que dice nombre: ***
       Si también cambiás el id:, acordate de renombrar las imagenes
       de la carpeta img/comisiones/ para que coincidan.
       ===================================================================== */
    nombre: "Gif",
    id: "gif",
    opciones: [
      { nombre: "Opcion1", id: "opcion1", precioUSD: 45, precioARS: 45000 },
      { nombre: "Opcion2", id: "opcion2", precioUSD: 60, precioARS: 60000 },
      { nombre: "Opcion3", id: "opcion3", precioUSD: 80, precioARS: 80000 },
    ],
  },

];
