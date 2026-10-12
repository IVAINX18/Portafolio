# Rediseno editorial del portafolio (inspirado en Patrick David)

Documento de aprendizaje del rediseno completo ejecutado sobre el portafolio de
Ivan Alexander Velasco Sanchez. Explica que se hizo, por que, como funciona y
que se probo realmente.

## Resumen del rediseno

El sitio paso de un lenguaje de "plantilla oscura de desarrollador"
(fondo navy, tarjetas con bordes, degradados) a una direccion de arte
  editorial: lienzo de tinta casi negro, tipografia de cartel (Anton) como
  protagonista, hairlines en lugar de tarjetas y anotaciones en monoespaciada.
  Las capturas reales de los productos ("placas") de la primera version se
  retiraron despues (ver "Capturas de producto retiradas").

La referencia (bepatrickdavid.com) se analizo directamente con webfetch.
Hallazgos verificados y como se adaptaron:

- Titular condensado gigante en el hero: se replica con Anton (la referencia
  usa Tusker Grotesk, fuente comercial; Anton es la sustituta libre).
- Repeticion de texto tipo marquee en enlaces: adaptada como una unica cinta
  separadora ("SHADOW-NET DEFENDER") entre el trabajo y la investigacion.
- Estrella como separador grafico: adaptada como un SVG geometrico simple.
- Composicion asimetrica con espacios negativos grandes: eje de toda la pagina.
- Listas de casos con etiqueta de categoria y enlace: convertidas en el
  dossier del flagship y las dos entradas secundarias.

No se replicaron: el modelo 3D WebGL, la lista de premios ni los clientes
(no existen para Ivan y no se inventan). La inspiracion queda en la direccion
artistica, no en el contenido.

## Archivos creados, modificados y eliminados

Creados:

- `src/components/Work.jsx`: seccion Selected work (flagship + mas trabajo).
- `src/components/Skills.jsx`: seccion Toolkit (mapa de capacidades + blandas).
- `src/components/projects/FlagshipProject.jsx`: dossier del proyecto principal.
- `src/components/projects/ProjectEntry.jsx`: entradas secundarias con dos tratamientos.
- `src/components/ui/Marquee.jsx`: cinta de texto unica de la pagina.
- `public/fonts/anton-latin.woff2`: fuente display self-hosted (SIL OFL).
- `Docs/Design/redesign-editorial.md`: este documento.

Modificados:

- `index.html`: preload de Anton, theme-color tinta, titulo y meta/OG actualizados.
- `tailwind.config.js`: tokens nuevos (ink/bone/line/accent) y familia display Anton.
- `src/index.css`: @font-face nuevos, base editorial, utilidades link-underline
  y marquee, radar recoloreado, kill-switch de reduced motion.
- `src/App.jsx`: nueva narrativa de secciones + cinta marquee.
- `src/components/Navigation.jsx`: nav mono minimal, menu movil a pantalla
  completa, progress hairline, `useMotionValueEvent`.
- `src/components/Hero.jsx`: hero cartel (nombre gigante, mascara por linea,
  subrayado SVG, retrato como placa).
- `src/components/Publications.jsx`: ficha editorial sin tarjeta.
- `src/components/About.jsx`: perfil editorial + certificaciones + "Currently".
- `src/components/Contact.jsx`: cierre con indice tipografico gigante + footer.
- `src/components/ui/SectionHeading.jsx`: titulos Anton con clamp().
- `src/components/ui/TechBadge.jsx`: etiqueta mono de esquinas rectas.
- `src/components/skills/TechnologyEcosystem.jsx`: paneles y chips al sistema nuevo.
- `src/components/skills/TechnologyRadar.jsx`: radar recoloreado al acento nuevo.
- `src/data/projects.js`: campos nuevos `role`, `image`, `imageAlt`, `caption`,
  `treatment` (los campos de captura quedaron sin uso tras el retiro; ver
  "Capturas de producto retiradas").
- `Docs/Design/design-system.md`: actualizado al sistema tinta/hueso.
- `dist/`: reconstruido (bundle, CSS y fuentes).

Eliminados:

- `src/components/FeaturedProjects.jsx` y `src/components/OtherProjects.jsx`
  (reemplazados por Work.jsx).
- `src/components/projects/FeaturedProjectCard.jsx` y
  `src/components/projects/NotableProjectCard.jsx` (reemplazados por
  FlagshipProject.jsx y ProjectEntry.jsx).
- `public/fonts/space-grotesk-var-latin.woff2` (fuente display retirada).
- `public/projects/shadow-net-defender.jpg` y `public/projects/hotel-website.jpg`
  (capturas de las demos en vivo, retiradas porque sus paletas chocaban con el
  sistema tinta/hueso; ver "Capturas de producto retiradas").

## Componentes principales

- **Hero**: cartel tipografico. Nombre en dos lineas con mascara de entrada,
  subrayado imperfecto (SVG), ficha de identidad en mono, retrato montado como
  placa con pie ("Ivan Velasco, portrait") y dos CTAs (pill de acento + outline).
- **Work**: recorre `featuredProjects` y `notableProjects`. El flagship se
  presenta como dossier (problema, descripcion, rol, stack, enlaces, nota y
  metricas verificadas como tira tipografica). Las entradas secundarias usan
  `treatment: 'plate'` (captura + texto) o `'text'` (fila de libro mayor a
  todo el ancho); hoy ambas usan `'text'` porque las capturas se retiraron.
  Tras retirar las capturas, la variante `'text'` vivia en `lg:col-span-6
  lg:col-start-6` y se leia como una columna central estrecha con la mitad
  izquierda del contenedor vacia; ahora cada fila usa las 12 columnas
  (identidad en cols 1-5, aire en medio, detalle en cols 7-12) con hairlines
  como unica estructura y la etiqueta "More work" como regla a todo el ancho.
- **Marquee**: dos mitades identicas y un desplazamiento del 50% para el bucle
  perfecto. Decorativa (`aria-hidden`), se detiene con reduced motion.
- **Publications**: ficha de la publicacion IEEE con metadatos reales
  (publisher, document ID, indice) y enlace al registro.
- **About**: narrativa a la izquierda; a la derecha certificaciones y estado
  actual. Sin tarjeta de perfil.
- **Skills (Toolkit)**: TechnologyEcosystem (radar + panel de detalle + leyenda
  de niveles de tres capas) y las habilidades blandas como etiquetas.
- **Contact**: titulo a escala de hero y los canales como indice tipografico
  grande (GitHub, LinkedIn, Email) con footer de hairlines.

## Dependencias nuevas y justificacion

- **npm: ninguna.** Todo el rediseno usa React, Tailwind y Framer Motion que ya
  estaban instalados.
- **Recursos: Anton (SIL Open Font License)** como fuente display self-hosted
  (18 KB, subset latin). Se eligio por licencia libre y por reproducir el
  lenguaje de cartel condensado de la referencia sin usar sus fuentes
  comerciales (Tusker Grotesk, Neue Montreal, Migra, Maelstrom).

## Animaciones e interacciones

- **Hero**: entrada escalonada; cada linea del nombre sube desde una mascara
  (`overflow-hidden` + `y: 110% -> 0`) y el resto aparece con fade.
- **Reveal** (wrapper existente): fade + desplazamiento corto al entrar en
  viewport, una sola vez.
- **Subrayados**: `link-underline` dibuja el subrayado con `background-size`
  al pasar el cursor o al enfocar con teclado.
- **Cinta marquee**: animacion CSS lineal infinita; unica en la pagina;
  desactivada con `prefers-reduced-motion`.
- **Nav**: indicador activo deslizante (spring de layout), hairline de
  progreso de lectura y menu movil a pantalla completa con lineas que entran
  escalonadas. El estado de scroll llega por `useMotionValueEvent`.
- **Radar y chips**: el contrato de hover mantiene la caja de impacto
  constante; solo cambian pintura (punto, halo, etiqueta y opacidad del
  destello del eje) y escala del punto (sin oscilaciones).
- **Reduced motion**: kill-switch global en CSS + guardas `useReducedMotion`
  en los componentes; el estado final es identico (verificado con captura).

## Decisiones de diseno y responsive

- **Paleta**: tinta + hueso + un acento. Los tokens viven en
  `tailwind.config.js`; ningun componente usa colores fuera de la lista.
- **Formas**: todo recto; pill solo en controles interactivos (regla
  documentada en el design system).
- **Sin tarjetas**: jerarquia por tamanos, hairlines y espacio negativo.
- **Desktop**: composicion editorial de 12 columnas con asimetrias
  (dossier 7/5, libro mayor de "More work" 5 + aire + 6 con hairlines).
  La variante `'text'` no copia la composicion del flagship (sin spec-dl
  ni tira de metricas): es identidad a la izquierda y detalle a la derecha.
- **Tablet**: los grids colapsan a una columna antes de comprimirse; el radar
  y su panel pasan a apilarse.
- **Movil**: orden del hero reorganizado (nombre, retrato, texto, CTAs);
  tipografia con `clamp()` para el cartel; menu a pantalla completa;
  los efectos de hover son mejora, nunca requisito (los subrayados y estados
  se ven tambien sin cursor).

## Pruebas ejecutadas y resultados reales

- `npm run build`: exitoso. Ultimo bundle `index-BycfJ0RP.js` (381 KB, 119 KB gzip)
  y CSS `index-WAjkIHnA.css`.
- QA del restyle del radar como figura tecnica con Chromium headless sobre
  `vite preview` (1440 y 390 px):
  - Cero errores de consola.
  - Sin overflow horizontal: `scrollWidth` igual a `innerWidth` en ambos viewports.
  - Ninguna etiqueta del perimetro recorta el viewBox (medicion de bounding
    boxes por script, ademas de revision visual).
  - Estado hover verificado sobre la etiqueta BACKEND: pasa a hueso, punto
    solido con halo y destello del eje hasta el anillo exterior.
  - Capturas revisadas: radar solo, radar en hover, panel del radar y seccion
    completa en ambos tamanos.
- `npx eslint .`: exit 0, cero errores. Los dos falsos positivos historicos de
  `motion` en JSX quedaron resueltos con el alias `Motion`.
- QA con Chromium headless sobre `vite preview` (1440 y 390 px) tras la
  recomposicion del libro mayor de "More work":
  - Cero errores de consola.
  - Sin overflow horizontal: `scrollWidth` igual a `innerWidth` en ambos viewports.
  - Las filas notables ocupan el contenedor completo (1376 px sobre 1376 px
    a 1440; 350 px sobre 350 px a 390), ya no la mitad derecha.
  - Titulos a `text-5xl` (48 px) en desktop y `text-4xl` (36 px) en movil.
  - Los enlaces Repository / Live demo quedan en una sola linea en ambos tamanos.
  - Capturas revisadas: fila Secure-Call + etiqueta, fila Hotel Website,
    etiqueta "More work" como regla a todo el ancho, apilado movil.
- QA con Chromium headless sobre `vite preview` (1440, 768 y 390 px):
  - Las tres fuentes cargan (`document.fonts.check` en Anton, Inter y JetBrains Mono).
  - Cero errores de consola y cero peticiones a Google Fonts.
  - Las imagenes cargaban (`naturalWidth > 0`); hoy solo queda el retrato.
  - Sin overflow horizontal en ningun viewport; "BMI" y em-dash ausentes.
  - Capturas revisadas visualmente: hero, work, research, about, toolkit,
    contact, pagina completa en los tres tamanos, menu movil y hero con
    animaciones terminadas.
- Bug real encontrado y corregido durante el QA: el `backdrop-blur` del nav
  creaba un containing block y el overlay del menu movil se anclaba al header.
  Se movio el menu fuera del `<nav>` (queda documentado en el codigo).

## Capturas de producto retiradas

La primera version del rediseno uso capturas reales de las demos en vivo como
placas (login de Shadow-Net, hero de Hotel Cerrrito). En revision se retiraron:
las paletas de las apps (morado, verde brillante) competian con el sistema
tinta/hueso y se leian como cuerpos ajenos a la composicion editorial. Hoy
ningun proyecto usa capturas: el flagship es un dossier tipografico y Hotel
Website paso a `treatment: 'text'`, como Secure-Call.

El soporte de datos (`image`, `imageAlt`, `caption`, `treatment: 'plate'`) sigue
vivo en los componentes: si un proyecto futuro merece placa, basta agregar los
campos, tratando la imagen para que respete la paleta.

## Radar como figura tecnica (restyle del Toolkit)

El radar se leia como un widget de libreria flotando en espacio muerto:
figura pequena (420 px de maximo), etiquetas en caja normal, relleno plano
translucido con aspecto de glow y pie centrado sin estructura. Lo trate como
una figura tecnica impresa del mismo taller editorial: hatch diagonal de 1 px
en acento (patron de 7 px, rotado 45 grados) sobre una base tenue en vez del
glow, contorno de 2 px con joins redondos, etiquetas en micro-caps mono
(11 px, mayusculas, tracking 0.14 em) ancladas a su eje con un tick radial
corto, cruz de origen de 1 px en color de hairline y destello del eje activo
solo con opacidad (0 a 0.25) reutilizando el estado `isActive` existente.
El panel izquierdo subio la figura a 520 px de maximo, con el radar centrado
en el espacio disponible y el pie como `figcaption` al pie del panel
(hairline + micro-caps alineada a la izquierda), espejo del pie de leyenda
del panel derecho. Elegi hatch en vez de relleno plano porque en captura se
lee texturizado sin ruido y los puntos quedan legibles sobre el; elegi la
cruz de origen porque se lee mas tecnica que el punto difuso anterior.
Sin cambios de copy, tokens ni datos; el contrato de hover de metricas
constantes y toda la semantica (roles, `aria-pressed`, etiquetas, teclado
Enter/Espacio) quedaron intactos. El detalle de constantes vive en el
comentario de cabecera de `TechnologyRadar.jsx`.

## Bloqueos conocidos

- El despliegue de Vercel no se dispara con los pushes recientes (la integracion
  GitHub - Vercel no registra deployments; el ultimo deploy exitoso fue
  `b01a1e5`). El proyecto compila y el `dist/` queda actualizado; falta
  reconectar la integracion o crear un Deploy Hook para publicar esta version.

## Posibles mejoras futuras

- Si se reincorporan capturas de producto, tratarlas para la paleta (p. ej.,
  monocromo) en vez de insertar el render crudo de la demo.
- Paginas de caso de estudio por proyecto si crece el contenido.
- Version en espanol del sitio (i18n) si se quiere cubrir ese mercado.
- Revision Lighthouse formal de Core Web Vitals en produccion.
- Micro-animacion de la cinta marquee al hacer hover (pausa/rebobinado),
  hoy pausada solo por prefers-reduced-motion.
