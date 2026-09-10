/* =========================================================================
   main.js  —  LÓGICA DEL SITIO
   =========================================================================
   ESTE ARCHIVO NO HACE FALTA TOCARLO.
   Todo lo que se edita normalmente está en:
       js/config.js       (mail, redes, imágenes)
       js/animaciones.js  (videos del portfolio)
       js/comisiones.js   (pestañas y precios)
       js/textos.js       (todos los textos en los dos idiomas)
   ========================================================================= */

(function () {
  "use strict";

  /* =======================================================================
     1) IDIOMA (español / inglés)
     ======================================================================= */

  var CLAVE_IDIOMA = "zalorancio_idioma";

  function leerGuardado() {
    try { return localStorage.getItem(CLAVE_IDIOMA); } catch (e) { return null; }
  }
  function guardar(idioma) {
    try { localStorage.setItem(CLAVE_IDIOMA, idioma); } catch (e) { /* modo privado */ }
  }

  var idiomaActual = leerGuardado() === "en" ? "en" : "es";

  function t(clave, idioma) {
    idioma = idioma || idiomaActual;
    var entrada = (typeof TEXTOS !== "undefined") ? TEXTOS[clave] : null;
    if (!entrada) return clave;
    return entrada[idioma] !== undefined ? entrada[idioma] : entrada.es;
  }

  function aplicarIdioma(idioma) {
    idiomaActual = idioma;
    document.documentElement.lang = idioma;

    // Texto visible
    cada("[data-i18n]", function (el) { el.textContent = t(el.getAttribute("data-i18n"), idioma); });
    // Cartelitos de mouse-over
    cada("[data-i18n-tooltip]", function (el) { el.setAttribute("data-tooltip", t(el.getAttribute("data-i18n-tooltip"), idioma)); });
    // Textos alternativos de imágenes
    cada("[data-i18n-alt]", function (el) { el.alt = t(el.getAttribute("data-i18n-alt"), idioma); });
    // Etiquetas de accesibilidad
    cada("[data-i18n-label]", function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-label"), idioma)); });

    var btn = document.getElementById("btn-idioma");
    if (btn) btn.innerHTML = idioma === "es" ? "<b>ES</b> / en" : "es / <b>EN</b>";

    // Avisa a las partes que se dibujan solas (grilla, panel de comisiones)
    document.dispatchEvent(new CustomEvent("idioma:cambiado", { detail: { idioma: idioma } }));
  }

  function iniciarIdioma() {
    var btn = document.getElementById("btn-idioma");
    if (btn) {
      btn.addEventListener("click", function () {
        var nuevo = idiomaActual === "es" ? "en" : "es";
        guardar(nuevo);
        aplicarIdioma(nuevo);
      });
    }
    aplicarIdioma(idiomaActual);
  }


  /* =======================================================================
     2) CARTELITOS DE MOUSE-OVER (tooltips)
     Aparecen recién a los 2 segundos y se desvanecen en 1 segundo.
     Cualquier elemento con  data-tooltip="texto"  los usa automáticamente.
     ======================================================================= */

  var RETARDO = 2000;      // milisegundos que hay que dejar el mouse encima
  var DESVANECIDO = 1000;  // milisegundos que tarda en desaparecer

  var caja = null;
  var temporizadorMostrar = null;
  var temporizadorSacar = null;

  function cajaTooltip() {
    if (!caja) {
      caja = document.createElement("div");
      caja.className = "tooltip";
      caja.setAttribute("role", "status");
      document.body.appendChild(caja);
    }
    return caja;
  }

  function mostrarTooltip(el, mensaje) {
    var c = cajaTooltip();
    clearTimeout(temporizadorSacar);
    c.textContent = mensaje;
    c.style.display = "block";
    c.style.transition = "none";
    c.style.opacity = "0";

    var r = el.getBoundingClientRect();
    var ancho = c.offsetWidth;
    var alto = c.offsetHeight;
    var x = r.left + r.width / 2 - ancho / 2;
    var y = r.top - alto - 12;
    if (y < 8) y = r.bottom + 12;                        // si no entra arriba, va abajo
    x = Math.max(8, Math.min(x, window.innerWidth - ancho - 8));
    c.style.left = x + "px";
    c.style.top = y + "px";

    // Aparece de una (el retardo de 2 segundos ya pasó).
    // El desvanecido suave es sólo al salir, en ocultarTooltip().
    c.style.transition = "none";
    c.style.opacity = "1";
  }

  function ocultarTooltip() {
    if (!caja) return;
    caja.style.transition = "opacity " + (DESVANECIDO / 1000) + "s ease";
    caja.style.opacity = "0";
    clearTimeout(temporizadorSacar);
    temporizadorSacar = setTimeout(function () { if (caja) caja.style.display = "none"; }, DESVANECIDO);
  }

  // Muestra un mensaje al instante (se usa al copiar el mail)
  function tooltipInstantaneo(el, mensaje, duracion) {
    clearTimeout(temporizadorMostrar);
    mostrarTooltip(el, mensaje);
    clearTimeout(temporizadorSacar);
    temporizadorSacar = setTimeout(ocultarTooltip, duracion || 2000);
  }

  function activarTooltips(raiz) {
    cada("[data-tooltip]", function (el) {
      if (el.__tooltipListo) return;
      el.__tooltipListo = true;

      el.addEventListener("mouseenter", function () {
        clearTimeout(temporizadorMostrar);
        temporizadorMostrar = setTimeout(function () {
          mostrarTooltip(el, el.getAttribute("data-tooltip"));
        }, RETARDO);
      });

      var salir = function () {
        clearTimeout(temporizadorMostrar);
        ocultarTooltip();
      };
      el.addEventListener("mouseleave", salir);
      el.addEventListener("blur", salir);
    }, raiz);
  }


  /* =======================================================================
     3) IMÁGENES CON RECUADRO DE "FALTA ESTA IMAGEN"
     Si el archivo todavía no existe, se dibuja un recuadro punteado con el
     nombre que hay que ponerle al archivo.
     ======================================================================= */

  function nombreDeArchivo(ruta) {
    return String(ruta).split("/").pop();
  }

  function escapar(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function placeholder(nombre, ancho, alto) {
    var tam = Math.max(9, Math.min(15, Math.round(ancho / 18)));
    var hayLugar = alto >= 64;                   // en recuadros muy bajos va una sola línea
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + ancho + '" height="' + alto + '" viewBox="0 0 ' + ancho + " " + alto + '">' +
      '<rect x="2" y="2" width="' + (ancho - 4) + '" height="' + (alto - 4) + '" rx="0" fill="#ece5d8" stroke="#3d3d3d" stroke-width="3" stroke-dasharray="11 8"/>' +
      '<text x="50%" y="' + (hayLugar ? "45%" : "50%") + '" dy="' + (hayLugar ? 0 : Math.round(tam / 3)) +
      '" text-anchor="middle" font-family="monospace" font-size="' + tam + '" fill="#3d3d3d">' + escapar(nombre) + "</text>" +
      (hayLugar
        ? '<text x="50%" y="45%" dy="' + (tam + 7) + '" text-anchor="middle" font-family="monospace" font-size="' + (tam - 1) + '" fill="#8a8172">falta (sirve .png o .gif)</text>'
        : "") +
      "</svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  // Formatos que se prueban, en este orden. Si "icon-sketch-sinfondo.png"
  // no existe, se busca "icon-sketch-sinfondo.gif", después .jpg, etc.
  // Así el dueño puede subir un PNG o un GIF con el mismo nombre y aparece.
  var FORMATOS = ["png", "gif", "jpg", "jpeg", "webp", "svg"];

  function variantesDeRuta(ruta) {
    ruta = String(ruta);
    var partes = ruta.match(/^(.*)\.([a-z0-9]+)$/i);
    if (/^https?:/i.test(ruta) || !partes) return [ruta];   // links externos: tal cual
    var base = partes[1];
    var ext = partes[2].toLowerCase();
    var lista = [ruta];
    FORMATOS.forEach(function (f) { if (f !== ext) lista.push(base + "." + f); });
    return lista;
  }

  // Pone la imagen; si no la encuentra en ningún formato, deja el recuadro punteado.
  function ponerImagen(img, ruta, ancho, alto) {
    if (!img) return;
    var intentos = variantesDeRuta(ruta);
    var i = 0;
    img.onerror = function () {
      i++;
      if (i < intentos.length) { img.src = intentos[i]; return; }
      img.onerror = null;
      img.classList.add("es-placeholder");
      img.src = placeholder(nombreDeArchivo(ruta), ancho, alto);
    };
    img.src = intentos[0];
  }


  /* =======================================================================
     4) AYUDAS GENERALES
     ======================================================================= */

  function cada(selector, fn, raiz) {
    var lista = (raiz || document).querySelectorAll(selector);
    for (var i = 0; i < lista.length; i++) fn(lista[i], i);
  }

  function crear(tag, clase) {
    var el = document.createElement(tag);
    if (clase) el.className = clase;
    return el;
  }

  function copiaVieja(texto) {
    var area = document.createElement("textarea");
    area.value = texto;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); } catch (e) { /* nada */ }
    document.body.removeChild(area);
  }

  function copiarAlPortapapeles(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(texto).catch(function () { copiaVieja(texto); });
    }
    copiaVieja(texto);
    return Promise.resolve();
  }

  function conPuntosDeMiles(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }


  /* =======================================================================
     5) PÁGINA PRINCIPAL (index.html)
     ======================================================================= */

  function iniciarMain() {
    ponerImagen(document.getElementById("img-personaje"), CONFIG.imagenes.personaje, 300, 330);
    ponerImagen(document.getElementById("img-logo"), CONFIG.imagenes.logo, 460, 120);
    ponerImagen(document.getElementById("img-subtitulo"), CONFIG.imagenes.subtitulo, 300, 44);
    ponerImagen(document.getElementById("icono-maletin"), CONFIG.imagenes.maletin, 34, 34);
    ponerImagen(document.getElementById("icono-lapiz"), CONFIG.imagenes.lapiz, 34, 34);
    ponerImagen(document.getElementById("icono-sobre"), CONFIG.imagenes.sobre, 26, 26);

    // Columna de redes sociales
    var cont = document.getElementById("redes");
    if (cont) {
      CONFIG.redes.forEach(function (red) {
        var a = crear("a", "icono-red");
        a.href = red.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.setAttribute("aria-label", red.nombre + " " + red.usuario);
        a.setAttribute("data-tooltip", red.nombre + " — " + red.usuario);
        var img = crear("img");
        img.alt = red.nombre;
        ponerImagen(img, red.icono, 52, 52);
        a.appendChild(img);
        cont.appendChild(a);
      });
    }

    // Botón Contact: copia el mail, no abre el cliente de correo
    var mail = document.getElementById("mail-visible");
    if (mail) mail.textContent = CONFIG.mail;

    var btnContacto = document.getElementById("btn-contacto");
    if (btnContacto) {
      btnContacto.addEventListener("click", function () {
        copiarAlPortapapeles(CONFIG.mail);
        tooltipInstantaneo(btnContacto, t("tooltip_copiado"), 2500);
      });
    }

    activarTooltips();
  }


  /* =======================================================================
     6) PÁGINA PORTFOLIO (portfolio.html)
     ======================================================================= */

  function urlEmbed(id, autoplay) {
    return "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) +
           "?rel=0&modestbranding=1" + (autoplay ? "&autoplay=1" : "");
  }

  function urlMiniatura(anim) {
    if (anim.miniatura && anim.miniatura.trim() !== "") return anim.miniatura.trim();
    return "https://img.youtube.com/vi/" + encodeURIComponent(anim.youtubeId) + "/hqdefault.jpg";
  }

  function iniciarPortfolio() {
    // ---- Demoreel ----
    var demo = document.getElementById("demoreel");
    if (demo && typeof DEMOREEL !== "undefined" && DEMOREEL.youtubeId) {
      var iframe = crear("iframe");
      iframe.src = urlEmbed(DEMOREEL.youtubeId, false);
      iframe.title = "Demoreel";
      iframe.allow = "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      demo.appendChild(iframe);
    }

    var grilla = document.getElementById("grilla");
    var modal = document.getElementById("modal");
    var modalVideo = document.getElementById("modal-video");
    var modalTitulo = document.getElementById("modal-titulo");

    // ---- Reproductor dentro de la misma página (modal) ----
    function abrirModal(anim) {
      if (!modal) return;
      modalVideo.innerHTML = "";
      var iframe = crear("iframe");
      iframe.src = urlEmbed(anim.youtubeId, true);
      iframe.title = anim.titulo;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      modalVideo.appendChild(iframe);
      modalTitulo.textContent = '"' + anim.titulo + '" (' + anim.fecha + ")";
      modal.classList.add("abierto");
      document.body.classList.add("sin-scroll");
      var cerrar = modal.querySelector(".modal-cerrar");
      if (cerrar) cerrar.focus();
    }

    function cerrarModal() {
      if (!modal) return;
      modal.classList.remove("abierto");
      document.body.classList.remove("sin-scroll");
      modalVideo.innerHTML = "";   // vaciar el modal es lo que detiene el video
    }

    // ---- Grilla de animaciones ----
    function dibujarGrilla() {
      if (!grilla) return;
      grilla.innerHTML = "";

      if (typeof ANIMACIONES === "undefined" || ANIMACIONES.length === 0) {
        var vacio = crear("p", "aviso-vacio");
        vacio.textContent = t("aviso_sin_animaciones");
        grilla.appendChild(vacio);
        return;
      }

      ANIMACIONES.forEach(function (anim) {
        var card = crear("article", "card");

        var boton = crear("button", "card-thumb");
        boton.type = "button";
        boton.setAttribute("aria-label", t("tooltip_reproducir") + ": " + anim.titulo);

        var img = crear("img");
        img.alt = anim.titulo;
        img.loading = "lazy";
        ponerImagen(img, urlMiniatura(anim), 480, 270);
        boton.appendChild(img);

        var play = crear("span", "play");
        play.setAttribute("aria-hidden", "true");
        boton.appendChild(play);

        boton.addEventListener("click", function () { abrirModal(anim); });
        card.appendChild(boton);

        var pie = crear("p", "card-pie");
        var titulo = crear("span", "card-titulo");
        titulo.textContent = '"' + anim.titulo + '"';
        var fecha = crear("span", "card-fecha");
        fecha.textContent = " (" + anim.fecha + ")";
        pie.appendChild(titulo);
        pie.appendChild(fecha);
        card.appendChild(pie);

        grilla.appendChild(card);
      });
    }

    if (modal) {
      cada(".modal-cerrar, .modal-fondo", function (el) {
        el.addEventListener("click", cerrarModal);
      }, modal);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("abierto")) cerrarModal();
      });
    }

    dibujarGrilla();
    activarTooltips();
    document.addEventListener("idioma:cambiado", function () { dibujarGrilla(); });
  }


  /* =======================================================================
     7) PÁGINA COMMISSIONS (commissions.html)
     ======================================================================= */

  function iniciarCommissions() {
    var contPestanias = document.getElementById("pestanias");
    var contOpciones = document.getElementById("opciones");
    var imgEjemplo = document.getElementById("img-ejemplo");
    var salidaUSD = document.getElementById("precio-usd");
    var salidaARS = document.getElementById("precio-ars");
    var checkNo = document.getElementById("fondo-no");
    var checkSi = document.getElementById("fondo-si");
    if (!contPestanias) return;

    var iPestania = 0;    // pestaña elegida
    var iOpcion = 0;      // sub-opción elegida
    var conFondo = false; // Background: No / Sí

    ponerImagen(document.getElementById("logo-paypal"), CONFIG.imagenes.paypal, 40, 40);
    ponerImagen(document.getElementById("logo-mercadopago"), CONFIG.imagenes.mercadopago, 40, 40);

    var btnInstagram = document.getElementById("btn-instagram");
    if (btnInstagram) btnInstagram.href = CONFIG.instagram;

    function dibujarPestanias() {
      contPestanias.innerHTML = "";
      COMISIONES.forEach(function (p, i) {
        var b = crear("button", "pestania" + (i === iPestania ? " activa" : ""));
        b.type = "button";
        b.textContent = p.nombre;
        b.setAttribute("aria-pressed", i === iPestania ? "true" : "false");
        b.addEventListener("click", function () {
          iPestania = i;
          iOpcion = 0;
          dibujarTodo();
        });
        contPestanias.appendChild(b);
      });
    }

    function dibujarOpciones() {
      contOpciones.innerHTML = "";
      COMISIONES[iPestania].opciones.forEach(function (o, i) {
        var b = crear("button", "subpestania" + (i === iOpcion ? " activa" : ""));
        b.type = "button";
        b.textContent = o.nombre;
        b.setAttribute("aria-pressed", i === iOpcion ? "true" : "false");
        b.addEventListener("click", function () {
          iOpcion = i;
          dibujarTodo();
        });
        contOpciones.appendChild(b);
      });
    }

    function dibujarEjemplo() {
      var p = COMISIONES[iPestania];
      var o = p.opciones[iOpcion];
      var ruta = "./img/comisiones/" + p.id + "-" + o.id + "-" + (conFondo ? "confondo" : "sinfondo") + ".png";
      var nuevo = crear("img");
      nuevo.id = "img-ejemplo";
      nuevo.alt = p.nombre + " " + o.nombre;
      ponerImagen(nuevo, ruta, 420, 420);
      imgEjemplo.parentNode.replaceChild(nuevo, imgEjemplo);
      imgEjemplo = nuevo;
    }

    function dibujarPrecio() {
      var o = COMISIONES[iPestania].opciones[iOpcion];
      var usd = o.precioUSD + (conFondo ? EXTRA_FONDO.usd : 0);
      var ars = o.precioARS + (conFondo ? EXTRA_FONDO.ars : 0);
      salidaUSD.textContent = "$" + conPuntosDeMiles(usd);
      salidaARS.textContent = "$" + conPuntosDeMiles(ars);
    }

    function dibujarTodo() {
      dibujarPestanias();
      dibujarOpciones();
      dibujarEjemplo();
      dibujarPrecio();
      activarTooltips();
    }

    // Los dos casilleros de Background se excluyen entre sí
    function marcarFondo(valor) {
      conFondo = valor;
      checkNo.checked = !valor;
      checkSi.checked = valor;
      dibujarEjemplo();
      dibujarPrecio();
    }
    checkNo.addEventListener("change", function () { marcarFondo(false); });
    checkSi.addEventListener("change", function () { marcarFondo(true); });

    dibujarTodo();
    marcarFondo(false);
    document.addEventListener("idioma:cambiado", function () { dibujarPrecio(); });
  }


  /* =======================================================================
     8) ARRANQUE
     ======================================================================= */

  document.addEventListener("DOMContentLoaded", function () {
    iniciarIdioma();

    var pagina = document.body.getAttribute("data-pagina");
    if (pagina === "main") iniciarMain();
    if (pagina === "portfolio") iniciarPortfolio();
    if (pagina === "commissions") iniciarCommissions();

    activarTooltips();
  });

})();
