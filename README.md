# Manual de la página de ZALORANCIO

Este manual está escrito para vos, sin nada de lenguaje técnico.
No hace falta saber programar para mantener la página al día.

---

## Lo primero: las reglas de oro

1. **Sólo tenés que abrir los archivos de la carpeta `js/` que dicen EDITABLE.**
   Son estos cuatro:

   | Archivo | Para qué sirve |
   |---|---|
   | `js/config.js` | Tu mail, tus redes sociales y dónde van las imágenes |
   | `js/animaciones.js` | Los videos del Portfolio |
   | `js/comisiones.js` | Las pestañas y los precios de Commissions |
   | `js/textos.js` | Todos los textos, en español y en inglés |

2. **No toques `js/main.js` ni `css/estilos.css`** (salvo los colores, ver más abajo)
   ni los archivos `.html`. Ahí está la lógica de la página.

3. Abrilos con el **Bloc de notas**, o mejor con
   [Notepad++](https://notepad-plus-plus.org/) o
   [Visual Studio Code](https://code.visualstudio.com/) (gratis, colorea el texto
   y es mucho más fácil no equivocarse).

4. **Nunca borres las comillas `" "`, las llaves `{ }`, los corchetes `[ ]` ni las
   comas `,`**. Si borrás una sin querer, la página deja de funcionar. Si pasa,
   deshacé con `Ctrl + Z` hasta que vuelva a estar como antes.

5. Antes de tocar algo, **hacé una copia de la carpeta entera**. Si algo sale mal,
   volvés a la copia y listo.

---

## Cómo agregar, borrar o reordenar una animación

Abrí **`js/animaciones.js`**. Vas a ver una lista de bloques así:

```js
{
  titulo:    "Animacion1",
  fecha:     "Julio 2026",
  youtubeId: "aqz-KE-bpKQ",
  miniatura: "",
},
```

### Agregar una animación

1. Copiá un bloque entero, desde la `{` hasta la `},` (con la coma).
2. Pegalo donde quieras dentro de la lista.
3. Cambiá el título, la fecha y el ID del video.

**Dónde queda en la página:** el orden de la lista es el orden en pantalla.
El bloque de más arriba aparece primero. Para que una animación nueva aparezca
primera, pegala arriba de todo, donde dice
`===== AGREGAR NUEVAS ANIMACIONES ACÁ ARRIBA =====`.

### Borrar una animación

Borrá su bloque entero, desde la `{` hasta la `},`.

### Reordenar

Cortá el bloque (`Ctrl + X`) y pegalo (`Ctrl + V`) en el lugar donde lo querés.

### No hay límite

Si ponés 40 bloques, se muestran las 40 animaciones. La grilla crece sola y
no hay paginado.

---

## Cómo cambiar el título, la fecha o el video

Todo en el mismo bloque de `js/animaciones.js`:

- `titulo:` es el nombre que se ve entre comillas en la página.
- `fecha:` es lo que se ve en gris al lado, entre paréntesis. Podés escribir lo
  que quieras: `"Julio 2026"`, `"2025"`, `"Marzo/Abril 2026"`.
- `youtubeId:` es el video.

### Cómo sacar el ID de un video de YouTube

Es el pedacito de letras y números del link:

| Link | ID |
|---|---|
| `https://www.youtube.com/watch?v=**dQw4w9WgXcQ**` | `dQw4w9WgXcQ` |
| `https://youtu.be/**dQw4w9WgXcQ**` | `dQw4w9WgXcQ` |

Pegá **sólo el ID**, no el link entero.

### El demoreel

Es el video grande de arriba de todo. Está separado, al principio del archivo:

```js
const DEMOREEL = {
  youtubeId: "aqz-KE-bpKQ",
};
```

### Sobre la miniatura

Si dejás `miniatura: ""` vacío, la página usa automáticamente la imagen que
YouTube le puso al video. Si preferís una tuya:

1. Guardá la imagen (PNG, JPG o GIF animado) en la carpeta `img/animaciones/`
2. Escribí la ruta: `miniatura: "./img/animaciones/mi-imagen.jpg",`

### Si un video se borra o lo ponés en privado

La página muestra el cartel de error del propio YouTube. No hay nada que
arreglar del lado de la página: o volvés a hacer público el video, o cambiás el
ID por otro, o borrás el bloque.

---

## Cómo cambiar los precios

Abrí **`js/comisiones.js`**.

```js
{ nombre: "Sketch",  id: "sketch",  precioUSD: 10, precioARS: 10000 },
```

- `precioUSD` es el número que se muestra en **dólares**.
- `precioARS` es el número que se muestra en **pesos**.

**Los dos precios son independientes.** El de pesos no se calcula a partir del
de dólares: no hay ningún tipo de cambio en la página. El número en pesos es el
que vos escribas, y podés cambiarlo cuando quieras sin tocar el de dólares.

**Cómo escribir los números:**

| Bien | Mal |
|---|---|
| `precioARS: 15000` | `precioARS: 15.000` |
| `precioUSD: 20` | `precioUSD: "$20"` |

Sin puntos, sin comas y sin el signo `$`. Los puntos de miles los pone la página
sola: `15000` se muestra como `$15.000 ARS`.

### El extra por fondo (Background)

Está arriba de todo en el mismo archivo:

```js
const EXTRA_FONDO = {
  usd: 5,
  ars: 5000,
};
```

Son montos fijos que se **suman** al precio cuando el visitante marca
**Background: Sí**. No son porcentajes.

### Renombrar las opciones de la pestaña Gif

Las tres opciones de `Gif` se llaman provisionalmente `Opcion1`, `Opcion2` y
`Opcion3`. Cambiá lo que dice `nombre:` por el nombre que quieras:

```js
{ nombre: "Loop corto", id: "opcion1", precioUSD: 45, precioARS: 45000 },
```

Cambiá **sólo `nombre:`**. Si también cambiás el `id:`, tenés que renombrar las
imágenes de ejemplo para que coincidan (ver la sección siguiente).

> Todos los precios que vienen cargados ahora son **inventados**. Cambialos por
> los tuyos antes de publicar la página.

---

## Cómo poner tus imágenes

Mientras una imagen no exista, la página muestra un **recuadro punteado con el
nombre exacto del archivo que falta**. Guardá tu imagen con ese nombre, en esa
carpeta, y aparece sola.

### GIF animados

En **cualquier lugar** donde va una imagen podés poner un GIF (animado o no).
Guardalo con el mismo nombre, pero terminado en `.gif`:

| El recuadro dice | Podés guardar |
|---|---|
| `icon-sketch-sinfondo.png` | `icon-sketch-sinfondo.png` **o** `icon-sketch-sinfondo.gif` |
| `personaje-banner.png` | `personaje-banner.png` **o** `personaje-banner.gif` |

La página prueba sola `.png`, `.gif` y `.jpg`, en ese orden. No hace falta
cambiar nada en los archivos de `js/`. Si hay dos archivos con el mismo nombre
(uno `.png` y uno `.gif`), gana el `.png`: borrá el que no quieras.

### Logo e ilustración (página principal)

| Archivo | Qué es | Tamaño sugerido |
|---|---|---|
| `img/logo/personaje-banner.png` | La ilustración del personaje | ~300 × 330 |
| `img/logo/zalorancio-logo.png` | El texto grande **ZALORANCIO** | ~460 × 120 |
| `img/logo/zalorancio-subtitulo.png` | El texto chico *2d rough animation* | ~300 × 44 |

Usá PNG con fondo transparente. También sirve GIF (animado o no).

### Íconos

Están en `img/iconos/`. Los que vienen ahora los dibujé yo; podés reemplazarlos
por los tuyos.

`youtube.svg`, `instagram.svg`, `x.svg`, `twitch.svg`, `maletin.svg`,
`lapiz.svg`, `sobre.svg`, `paypal.svg`, `mercadopago.svg`

Para usar un PNG o un GIF tuyo en lugar del SVG que está ahora, lo más fácil es
**borrar el `.svg`** y dejar tu archivo con el mismo nombre (`youtube.png` o
`youtube.gif`): la página lo encuentra sola. O cambiá la ruta en
`js/config.js`. Por ejemplo:

```js
icono: "./img/iconos/youtube.png",
```

### Imágenes de ejemplo de las comisiones

Van todas en `img/comisiones/`, en **PNG o GIF**, y el nombre tiene que ser exacto:

```
pestaña - opción - fondo .png
```

Son 24 archivos (4 pestañas × 3 opciones × con y sin fondo):

```
icon-sketch-sinfondo.png        icon-sketch-confondo.png
icon-lineart-sinfondo.png       icon-lineart-confondo.png
icon-color-sinfondo.png         icon-color-confondo.png

halfbody-sketch-sinfondo.png    halfbody-sketch-confondo.png
halfbody-lineart-sinfondo.png   halfbody-lineart-confondo.png
halfbody-color-sinfondo.png     halfbody-color-confondo.png

fullbody-sketch-sinfondo.png    fullbody-sketch-confondo.png
fullbody-lineart-sinfondo.png   fullbody-lineart-confondo.png
fullbody-color-sinfondo.png     fullbody-color-confondo.png

gif-opcion1-sinfondo.png        gif-opcion1-confondo.png
gif-opcion2-sinfondo.png        gif-opcion2-confondo.png
gif-opcion3-sinfondo.png        gif-opcion3-confondo.png
```

Todo en minúscula, sin espacios y sin acentos. No hace falta subirlas todas de
una: las que falten siguen mostrando el recuadro punteado.

---

## Cómo cambiar los textos (español e inglés)

Abrí **`js/textos.js`**. Cada línea tiene el texto en los dos idiomas, uno al
lado del otro:

```js
tooltip_portfolio: { es: "Ver portafolio", en: "See portfolio" },
```

- Editá **sólo lo que está entre comillas**.
- `es` es el español, `en` es el inglés.
- **No cambies el nombre de la izquierda** (`tooltip_portfolio`): es lo que usa
  la página para encontrar el texto.

Los nombres propios (ZALORANCIO, Portfolio, Commissions, Demoreel,
All Animations, Icon, Half body, Full body, Gif) están puestos iguales en los dos
idiomas a propósito. Los títulos de las animaciones no se traducen: se cambian
en `js/animaciones.js`.

El idioma que elige el visitante queda guardado en su navegador: si cambia a
inglés, sigue en inglés al pasar de página y al volver a entrar.

---

## Cómo cambiar el mail, las redes y el Instagram

Todo en **`js/config.js`**:

- `mail:` — el mail que se muestra y que se copia al hacer click en **Contact**.
- `redes:` — un bloque por red social. Cambiá `usuario:` y `url:`.
  Para sacar una red, borrá su bloque entero. Para agregar otra, copiá un bloque
  y cambiale los datos.
- `instagram:` — el link del botón grande del final de la página Commissions.

---

## Cómo cambiar los colores o la tipografía

Está todo junto al principio de **`css/estilos.css`**, en el bloque `:root`.
Es la única parte de ese archivo que conviene tocar:

```css
--color-fondo:  #faf6ef;   /* blanco hueso del fondo   */
--color-gris:   #3d3d3d;   /* botón PORTFOLIO y paneles */
--color-rojo:   #c0392b;   /* COMMISSIONS y Contact     */
```

Para cambiar la letra manuscrita hay que cambiar dos cosas:

1. En `css/estilos.css`, la línea `--fuente-titulo: "Permanent Marker", ...`
2. En los tres archivos `.html`, el link de Google Fonts del `<head>`, cambiando
   `Permanent+Marker` por el nombre de la fuente nueva.

Otras que quedan bien: `Caveat`, `Patrick Hand`, `Rock Salt`.

---

## Cómo ver la página en tu computadora antes de subirla

Hacé doble click en **`index.html`**. Se abre en el navegador y funciona igual
que online. Todo lo que cambies se ve apretando `F5`.

> Detalle: abriendo el archivo así, el botón **Contact** puede no copiar el mail
> en algunos navegadores por seguridad. Subida a GitHub Pages funciona siempre.

---

## Cómo subir los cambios a GitHub Pages

### La primera vez

1. Entrá a [github.com](https://github.com) y creá una cuenta si no tenés.
2. Arriba a la derecha, **+** → **New repository**.
3. Ponele un nombre (por ejemplo `zalorancio`), dejalo en **Public** y
   apretá **Create repository**.
4. En la página que aparece, hacé click en **uploading an existing file**.
5. Arrastrá **todo el contenido de la carpeta**: `index.html`, `portfolio.html`,
   `commissions.html`, `README.md` y las carpetas `css`, `js` e `img`.
   Arrastrá el contenido, **no la carpeta que lo contiene**.
6. Abajo, apretá **Commit changes**.
7. Andá a la pestaña **Settings** → en el menú de la izquierda, **Pages**.
8. En **Source** elegí **Deploy from a branch**, y en **Branch** elegí `main`
   y la carpeta `/ (root)`. Apretá **Save**.
9. Esperá un minuto y recargá esa página: arriba va a aparecer la dirección de
   tu sitio, algo como `https://tuusuario.github.io/zalorancio/`.

### Cada vez que cambies algo

1. Entrá a tu repositorio en GitHub.
2. Metete en la carpeta y hacé click en el archivo que cambiaste
   (por ejemplo `js/animaciones.js`).
3. Apretá el ícono del **lápiz** (*Edit this file*).
4. Hacé el cambio ahí mismo y apretá **Commit changes**.

O, si preferís editar en tu computadora: **Add file** → **Upload files**,
arrastrás el archivo cambiado y **Commit changes**. Se pisa el viejo.

Los cambios tardan **entre 1 y 2 minutos** en verse online. Si no los ves,
recargá con `Ctrl + F5` (recarga forzada, ignora lo que el navegador tenía
guardado).

---

## Si algo se rompe

- La página se ve en blanco o sin estilos → seguro falta una comilla, una coma o
  una llave en alguno de los archivos de `js/`. Deshacé con `Ctrl + Z` o volvé a
  tu copia de respaldo.
- Para ver el error exacto: en el navegador, apretá `F12`, andá a la solapa
  **Console** y fijate el texto en rojo. Te dice el archivo y el número de línea.
- Una imagen no aparece y se ve un recuadro punteado → el nombre del archivo no
  coincide exactamente con el que dice el recuadro (ojo con mayúsculas,
  acentos y con `.png` vs `.jpg`).

---

## Qué NO tiene la página, a propósito

Sin base de datos, sin usuarios, sin login, sin panel de administración, sin
carrito y sin pagos. La página **informa** los precios: la comisión se arregla
por DM de Instagram. Por eso se mantiene editando estos archivos y nada más.
