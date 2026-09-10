# Prompt para Claude Code — Sitio web portfolio "Zalorancio"

> Pegá todo lo que sigue en Claude Code, en una carpeta vacía.

---

## Contexto

Necesito que construyas un sitio web estático de portfolio para un animador 2D (alias "Zalorancio", nombre real Gonzalo Mansilla). El sitio se va a alojar en **GitHub Pages** y lo va a mantener el propio artista, que **no sabe programar**. La prioridad número uno del proyecto es que él pueda agregar animaciones, cambiar precios, links y textos editando archivos claramente marcados, sin tocar lógica.

## Stack y restricciones técnicas

- **HTML + CSS + JavaScript vanilla**. Sin React, sin frameworks, sin bundlers, sin npm, sin build step.
- El sitio tiene que funcionar tanto abriendo `index.html` localmente como subido a GitHub Pages.
- **Todas las rutas deben ser relativas** (`./img/...`, `./js/...`). Nada de rutas absolutas que arranquen con `/`, porque rompen en los project sites de GitHub Pages (`usuario.github.io/repo/`).
- Sin backend, sin base de datos, sin login, sin cuentas, sin CMS, sin panel de administración, sin sistema de comentarios, sin carrito ni pagos.
- Podés usar Google Fonts vía CDN. Nada más de terceros.

## Estructura de archivos

```
/index.html            → página Main
/portfolio.html        → página Portfolio
/commissions.html      → página Commissions
/css/estilos.css
/js/config.js          → EDITABLE: datos generales, redes, mail, links
/js/animaciones.js     → EDITABLE: lista de videos del portfolio
/js/comisiones.js      → EDITABLE: pestañas, opciones y precios
/js/textos.js          → EDITABLE: todos los textos en español e inglés
/js/main.js            → lógica (el dueño no toca esto)
/img/                  → imágenes, con subcarpetas ordenadas
/README.md             → instrucciones de mantenimiento en español
```

Los cuatro archivos "EDITABLE" son los únicos que el dueño debería necesitar abrir. Escribilos con comentarios abundantes y explícitos, en español, del estilo:

```js
// ===================================================
//  CAMBIAR AQUÍ EL LINK DEL VIDEO DE YOUTUBE
//  Pegá solo el ID del video (lo que va después de v=)
// ===================================================
```

Que agregar una animación nueva sea copiar un bloque, pegarlo y cambiar tres valores. Nada más.

---

## Página 1 — Main (`index.html`)

Layout:

- **Banner superior**: ilustración del personaje a la izquierda, y a la derecha el logo con el texto grande **ZALORANCIO** y debajo, más chico, **2d rough animation**. Ambas cosas son imágenes que va a proveer el dueño; por ahora poné placeholders del tamaño correcto y dejá comentado dónde va cada archivo.
- **Dos botones grandes apilados**, centrados debajo del banner:
  - `PORTFOLIO` (gris oscuro) → lleva a `portfolio.html`
  - `COMMISSIONS` (rojo) → lleva a `commissions.html`
  - Cada uno con un ícono chico a la derecha (maletín y lápiz).
- **Columna de íconos de redes sociales** a la derecha de los botones, en vertical: YouTube, Instagram, X, Twitch. Cada uno abre el perfil correspondiente en una pestaña nueva. Los íconos son imágenes provistas por el dueño (placeholders por ahora).
- **Botón "Contact"** a la izquierda, en rojo, con el mail visible debajo en chico y un ícono de sobre.
- **Botón de idioma ES / EN** en una esquina (arriba a la derecha), presente en las tres páginas.

Interacciones:

- **Tooltips con retardo**: todos los mensajes de mouse-over aparecen recién después de **2 segundos** con el cursor encima, y al salir desaparecen con un **fade-out de ~1 segundo**. Implementalo con un helper reutilizable, no repitiendo código por elemento.
  - Íconos de redes: el tooltip muestra el nombre de la red + el arroba (ej. `YouTube — @zalorancio`).
  - Botón Portfolio: `Ver portafolio`.
  - Botón Commissions: `Commissions info`.
  - Botón Contact: `Copiar mail`.
- **Botón Contact**: al hacer click **copia el mail al portapapeles** (Clipboard API con fallback) y el cuadrito cambia el mensaje a `¡Copiado al portapapeles!` durante unos segundos. No abre el cliente de correo.

---

## Página 2 — Portfolio (`portfolio.html`)

- **Sección "Demoreel"**: un solo video de YouTube embebido, grande, centrado. Ocupa buena parte de la pantalla inicial; el resto del contenido aparece al scrollear.
- **Sección "All Animations"**: grilla de **3 columnas** de videos. Cada card muestra la miniatura con botón de play, y debajo el título entre comillas seguido de la fecha en gris (ej. `"Pammy By Makumeta" (Julio 2026)`). **Sin descripciones escritas.**
- La grilla se genera automáticamente recorriendo el array de `js/animaciones.js`, así que crece sola: si el dueño agrega 40 videos, se renderizan 40. Sin paginación, sin límite.
- **Al hacer click en un video se abre el reproductor de YouTube dentro de la misma página** (modal / lightbox con fondo oscurecido, botón de cerrar y cierre con la tecla Escape). Nunca redirige a youtube.com.
- Las miniaturas pueden salir automáticamente de la miniatura de YouTube a partir del ID del video, pero dejá también la opción de poner una imagen propia por si el dueño la prefiere.
- **Videos caídos**: si un video fue borrado o puesto en privado, se muestra el error nativo de YouTube. No implementes ninguna detección ni reemplazo propio.

Formato del archivo editable:

```js
// js/animaciones.js
const DEMOREEL = {
  youtubeId: "XXXXXXXXXXX",     // ← ID del video del demoreel
};

const ANIMACIONES = [
  // ===== AGREGAR NUEVAS ANIMACIONES AQUÍ (arriba = aparece primero) =====
  {
    titulo:    "Animacion1",     // ← título que se muestra
    fecha:     "Julio 2026",     // ← fecha que se muestra
    youtubeId: "XXXXXXXXXXX",    // ← ID del video de YouTube
    miniatura: "",               // ← opcional: "./img/animaciones/mi-thumb.jpg". Si queda vacío usa la de YouTube
  },
  // ... etc
];
```

El **orden del array define el orden en pantalla**: para reordenar, mover el bloque.

---

## Página 3 — Commissions (`commissions.html`)

Título grande: **Commissions Info**.

Debajo, un panel con:

- **4 pestañas horizontales arriba**: `Icon`, `Half body`, `Full body`, `Gif`.
- Dentro de cada pestaña, **3 sub-pestañas verticales a la izquierda**. En Icon, Half body y Full body se llaman `Sketch`, `Lineart`, `Color`. La pestaña **Gif funciona exactamente igual (misma estructura de 3 sub-opciones), solo que los nombres son distintos** — usá nombres provisionales `Opcion1`, `Opcion2`, `Opcion3` y dejalos bien marcados para que el dueño los renombre.
- **Al centro**: la imagen de ejemplo correspondiente a la combinación pestaña + sub-opción + fondo.
- **A la derecha**:
  - Recuadro **Costo**: precio en **USD** con logo de PayPal, y debajo el precio en **ARS** con logo de Mercado Pago.
  - Recuadro de advertencia con ícono: aclara que es solo un estimado y que cada comisión se negocia por separado.
  - Recuadro **Background** con dos checkboxes excluyentes: `No` / `Sí`. Cambiar esta opción **modifica el precio mostrado y también la imagen de ejemplo** (variante con fondo / sin fondo).

Debajo del panel, la lista de condiciones (texto fijo, bilingüe):

- No hago NSFW.
- Correcciones y modificaciones solo en la etapa de boceto.
- Distintos niveles de complejidad en composición y/o color modifican el precio y los plazos de entrega.
- Dibujos y animaciones fuera de lo sugerido también se pueden hacer (por ejemplo, miniaturas de YouTube o animaciones cortas con audio).

Y un bloque de aclaración final, obligatorio:

- Los precios mostrados son **estimativos**.
- **La comisión no se compra desde la página.**
- Para solicitar una comisión hay que contactar al artista por **DM de Instagram**.
- El precio y los detalles finales se negocian directamente con el artista.
- Incluir un **botón/link directo al perfil de Instagram**.

### Precios e imágenes

En `js/comisiones.js`:

- **Nada de conversión automática de moneda.** Cada sub-opción tiene **dos precios cargados a mano, independientes entre sí**: uno en USD y otro en ARS. El dueño quiere que el precio en pesos sea un número que él elige según la economía local, no el resultado de multiplicar por un tipo de cambio. No agregues ninguna constante de tipo de cambio ni cálculo de conversión en ningún lado.
- El extra por fondo es también **un número fijo que el dueño escribe a mano** (un monto en USD y otro en ARS, no un porcentaje). Se suma al precio cuando la opción Background está en "Sí".

```js
// js/comisiones.js — ejemplo del formato
{
  nombre: "Sketch",
  precioUSD: 15,      // ← precio en dólares (a mano)
  precioARS: 15000,   // ← precio en pesos (a mano, NO es la conversión del de arriba)
}
```
- Todos los precios iniciales son **inventados y provisionales**, claramente marcados como tales.

Imágenes: son **4 pestañas × 3 sub-opciones × 2 variantes = 24 archivos**. Usá una nomenclatura predecible y documentada, por ejemplo:

```
img/comisiones/icon-sketch-confondo.png
img/comisiones/icon-sketch-sinfondo.png
img/comisiones/halfbody-lineart-confondo.png
...
```

Mientras no existan, mostrá placeholders del tamaño correcto (podés generarlos vos como SVG o color plano con el nombre del archivo escrito encima, para que se vea claro cuál falta). La ruta de cada imagen se arma automáticamente a partir del nombre, así que reemplazar un archivo con el nombre correcto alcanza para que aparezca.

---

## Bilingüe (español / inglés)

- Botón de idioma visible en las tres páginas.
- **Todos los textos viven en `js/textos.js`**, en un objeto con las claves en ambos idiomas, uno al lado del otro para que sea fácil editarlos juntos:

```js
const TEXTOS = {
  boton_portfolio_tooltip: { es: "Ver portafolio", en: "See portfolio" },
  ...
};
```

- En el HTML usá atributos `data-i18n="clave"` y que el JS reemplace el contenido al cambiar de idioma. Nada de duplicar páginas por idioma.
- La preferencia se guarda en `localStorage` y se mantiene al navegar entre páginas y al volver a entrar.
- Los nombres propios y títulos de sección (`ZALORANCIO`, `Portfolio`, `Commissions`, `Demoreel`, `All Animations`, `Icon`, `Half body`, `Full body`, `Gif`) se mantienen igual en ambos idiomas.
- Los títulos de las animaciones no se traducen.

---

## Estética

Híbrido entre lo dibujado a mano y lo prolijo: **layout limpio, ordenado y bien alineado, con tipografía y detalles hechos a mano.**

- **Tipografía**: una fuente display manuscrita/marcador para títulos, botones y etiquetas (algo tipo Permanent Marker, Caveat o Patrick Hand desde Google Fonts — elegí la que mejor pegue con el boceto y dejá la elección comentada para poder cambiarla en una línea). Para párrafos y textos largos, una sans legible.
- **Paleta**, tomada de los bocetos, definida como variables CSS al principio de `estilos.css`:
  - fondo blanco / hueso
  - gris oscuro para el botón Portfolio y los paneles (≈ `#3d3d3d`)
  - rojo para Commissions, Contact y las pestañas (≈ `#c0392b`)
  - negro para trazos y bordes
- **Detalles**: bordes gruesos tipo trazo de marcador, esquinas apenas irregulares, rotaciones mínimas (0.3°–0.8°) en algunos elementos para que no se sienta perfecto, sombras suaves. Hover con un desplazamiento chico y una transición corta.
- Que no parezca una plantilla de Bootstrap. La referencia visual son los bocetos del brief: caseros, con carácter, pero legibles y ordenados.

## Responsive

No es prioridad. Diseñá para escritorio manteniendo el layout del boceto. Solo asegurate de que en pantallas más chicas no se rompa de forma catastrófica (que no haya scroll horizontal ni texto que se salga). Una adaptación mobile específica se hará más adelante.

---

## Datos provisionales

Donde falte información real, inventá datos genéricos y dejalos claramente marcados como provisionales, agrupados al principio de los archivos editables:

- Animaciones: `Animacion1`, `Animacion2`, `Animacion3`... con fechas inventadas. Poné al menos 9 para que se vea la grilla llena.
- Precios: valores redondos e inventados.
- Mail de contacto y usuarios de redes: usá `zalorancio@gmail.com` y `@zalorancio` como provisionales, en un solo lugar de `config.js`.
- Links de YouTube: podés usar IDs de video de ejemplo para que el reproductor se vea funcionando.

## Entregable final

1. El sitio completo y funcionando.
2. Un **`README.md` en español**, escrito para alguien que no programa, con secciones cortas:
   - Cómo agregar / borrar / reordenar una animación.
   - Cómo cambiar títulos, fechas y links de video.
   - Cómo cambiar los precios en dólares y en pesos, y el extra por fondo.
   - Cómo reemplazar las imágenes (logos, íconos, ilustraciones, ejemplos de comisiones) y con qué nombre guardarlas.
   - Cómo editar los textos en los dos idiomas.
   - Cómo subir los cambios a GitHub Pages.

Antes de empezar, mostrame la estructura de archivos que vas a crear y esperá mi confirmación.
