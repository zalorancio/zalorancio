/* =========================================================================
   textos.js  —  ARCHIVO EDITABLE
   TODOS los textos del sitio, en español e inglés, uno al lado del otro.
   -------------------------------------------------------------------------
   Cada línea es así:

       clave_interna: { es: "texto en español", en: "texto en inglés" },
       ^^^^^^^^^^^^^                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
       no toques esto                esto sí se edita

   * Editá SOLO lo que está entre comillas.
   * No cambies el nombre de la izquierda (la clave): es lo que usa la
     página para encontrar el texto.
   * No borres las comas del final de cada línea.

   Los nombres propios (ZALORANCIO, Portfolio, Commissions, Demoreel,
   All Animations, Icon, Half body, Full body, Gif) son iguales en los dos
   idiomas a propósito: figuran con el mismo texto en "es" y en "en".
   Los títulos de las animaciones no se traducen: se editan en animaciones.js
   ========================================================================= */

const TEXTOS = {

  /* ============ TÍTULOS DE LA PESTAÑA DEL NAVEGADOR ==================== */
  titulo_pagina_main:        { es: "ZALORANCIO — 2d rough animation", en: "ZALORANCIO — 2d rough animation" },
  titulo_pagina_portfolio:   { es: "Portfolio — ZALORANCIO",          en: "Portfolio — ZALORANCIO" },
  titulo_pagina_commissions: { es: "Commissions — ZALORANCIO",        en: "Commissions — ZALORANCIO" },

  /* ============ PÁGINA PRINCIPAL ====================================== */
  boton_portfolio:           { es: "PORTFOLIO",   en: "PORTFOLIO" },
  boton_commissions:         { es: "COMMISSIONS", en: "COMMISSIONS" },
  boton_contacto:            { es: "Contact",     en: "Contact" },

  /* ---- Cartelitos que aparecen al dejar el mouse encima (2 segundos) --- */
  tooltip_portfolio:         { es: "Ver portafolio",             en: "See portfolio" },
  tooltip_commissions:       { es: "Commissions info",           en: "Commissions info" },
  tooltip_contacto:          { es: "Copiar mail",                en: "Copy e-mail" },
  tooltip_copiado:           { es: "¡Copiado al portapapeles!",  en: "Copied to clipboard!" },
  tooltip_idioma:            { es: "Cambiar idioma",             en: "Change language" },

  /* ============ NAVEGACIÓN ============================================ */
  volver_inicio:             { es: "Volver al inicio", en: "Back to home" },

  /* ============ PÁGINA PORTFOLIO ====================================== */
  seccion_demoreel:          { es: "Demoreel",       en: "Demoreel" },
  seccion_animaciones:       { es: "All Animations", en: "All Animations" },
  tooltip_reproducir:        { es: "Reproducir",     en: "Play" },
  tooltip_cerrar:            { es: "Cerrar",         en: "Close" },
  aviso_sin_animaciones:     { es: "Todavía no hay animaciones cargadas.", en: "No animations loaded yet." },

  /* ============ PÁGINA COMMISSIONS ==================================== */
  titulo_commissions:        { es: "Commissions Info", en: "Commissions Info" },
  costo_titulo:              { es: "Costo",            en: "Cost" },
  aviso_estimado:            { es: "Sólo es un estimado. Como cada comisión es distinta, el precio se negocia en cada caso.",
                               en: "This is only an estimate. Since every commission is different, the price is agreed case by case." },
  background_titulo:         { es: "Background", en: "Background" },
  background_no:             { es: "No",         en: "No" },
  background_si:             { es: "Sí",         en: "Yes" },

  /* ---- Lista de condiciones ------------------------------------------ */
  condiciones_titulo:        { es: "Condiciones", en: "Conditions" },
  condicion_1:               { es: "No hago NSFW.",
                               en: "I don't do NSFW." },
  condicion_2:               { es: "Correcciones y modificaciones sólo en la etapa de boceto.",
                               en: "Corrections and changes only during the sketch stage." },
  condicion_3:               { es: "Distintos niveles de complejidad en composición y/o color modifican el precio y los plazos de entrega.",
                               en: "Different levels of complexity in composition and/or color change the price and the delivery time." },
  condicion_4:               { es: "Dibujos y animaciones fuera de lo sugerido también se pueden hacer (por ejemplo, miniaturas de YouTube o animaciones cortas con audio).",
                               en: "Drawings and animations outside these options are also possible (for example, YouTube thumbnails or short animations with audio)." },

  /* ---- Aclaración final ---------------------------------------------- */
  aclaracion_titulo:         { es: "Antes de pedir una comisión", en: "Before requesting a commission" },
  aclaracion_1:              { es: "Los precios que se muestran son estimativos.",
                               en: "The prices shown are estimates." },
  aclaracion_2:              { es: "La comisión NO se compra desde esta página.",
                               en: "Commissions are NOT purchased through this website." },
  aclaracion_3:              { es: "Para solicitar una comisión hay que contactarme por mensaje directo (DM) de Instagram.",
                               en: "To request a commission, contact me by direct message (DM) on Instagram." },
  aclaracion_4:              { es: "El precio y los detalles finales se negocian directamente conmigo.",
                               en: "The final price and details are agreed directly with me." },
  boton_instagram:           { es: "Escribime por Instagram", en: "Message me on Instagram" },

};
