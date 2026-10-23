Portfolio · Florencia Acuña Cecchin
Sitio estático (HTML, CSS y JavaScript, sin instalar nada) listo para publicar con GitHub Pages.
Dónde va cada imagen y el video
Todo va dentro de `assets/proyectos/`, en la carpeta de cada proyecto. Se aceptan `.jpg` o `.png`.
Si un archivo no está, esa parte simplemente no se muestra.
Proyecto	Carpeta	Archivos
Gestión de Infracciones Movilis	`assets/proyectos/infracciones-movilis/`	`portada.jpg`, `captura-1.jpg`, `captura-2.jpg`, `captura-3.jpg`, `video.mp4`, `video-portada.jpg`, opcional `cursograma.png`
Infracciones de unidades en stock (usados)	`assets/proyectos/infracciones-usados/`	`portada.jpg`, `captura-1.jpg`, `captura-2.jpg`, `cursograma.png` (tu cursograma)
Robot lector de PDF y dashboard	`assets/proyectos/robot-pdf/`	`portada.jpg`, `captura-1.jpg`, `captura-2.jpg`, opcional `cursograma.png`
Envío automático de comprobantes	`assets/proyectos/envio-comprobantes/`	`portada.jpg`, `captura-1.jpg`, `captura-2.jpg`, opcional `cursograma.png`
Conciliación tarjeta habitualista	`assets/proyectos/conciliacion-gestoria/`	`portada.jpg`, `captura-1.jpg`, `captura-2.jpg`, opcional `cursograma.png` (si la subís, reemplaza al dibujado)
Proyecto Marketing Jóvenes Profesionales	`assets/proyectos/marketing-jovenes-profesionales/`	`portada.jpg`, `captura-1.jpg`, `captura-2.jpg`
`portada`: la imagen que aparece al pasar el mouse sobre el proyecto (si no está, usa `captura-1`).
`captura-N`: el orden de la galería. Los textos debajo de cada captura se cambian en `assets/js/data.js` (campo `shots`).
Para sumar más capturas, agregá `captura-4.jpg` y un texto más en `shots`.
El video de Infracciones
Formato MP4 (H.264), horizontal 16:9, ideal 1 a 3 minutos.
Peso menor a 25 MB (es el límite para subir por la web de GitHub). Si pesa más, comprimilo con HandBrake, preset "Fast 1080p30", o bajalo a 720p.
`video-portada.jpg` es la imagen que se ve antes de darle play (puede ser una captura de la pantalla principal).
Links de cada proyecto
En `assets/js/data.js`, completá el campo `url` de cada proyecto. Ejemplo para Infracciones:
```js
url:'https://tu-link-de-infracciones.vercel.app', urlLabel:'Abrir Infracciones',
```
Si `url` queda vacío, el botón dice "link próximamente".
Publicar en GitHub Pages
En github.com, tocá New repository. Nombre: `portfolio`. Público. Crear.
Tocá uploading an existing file y arrastrá todo el contenido de esta carpeta (`index.html`, `assets/`, `README.md`).
Commit changes.
Andá a Settings, Pages. En Branch elegí `main` y carpeta `/ (root)`. Guardar.
En uno o dos minutos queda en `https://TU-USUARIO.github.io/portfolio/`.
Para actualizar algo después: subí el archivo nuevo con el mismo nombre en la misma carpeta y GitHub lo reemplaza.
Probarlo en tu computadora
Doble clic en `index.html`. Funciona igual que publicado (necesita internet para la tipografía).
