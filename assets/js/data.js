/* =====================================================================
   DATOS DEL PORTFOLIO
   Para cambiar textos, links o capturas, editá este archivo.

   Imágenes y video de cada proyecto van en:
     assets/proyectos/<carpeta del proyecto>/
       portada.jpg      → imagen de la lista de proyectos
       captura-1.jpg    → capturas de la galería (captura-2.jpg, captura-3.jpg...)
       video.mp4        → solo Infracciones Movilis (video demo)
       video-portada.jpg→ imagen que se ve antes de darle play
       cursograma.png   → cursograma propio (si existe, reemplaza al dibujado)
   Se aceptan .jpg o .png. Si una imagen no está, simplemente no se muestra.
   ===================================================================== */

const TASKS = [
  {title:'Pago a proveedores vía Interbanking', freq:'Semanal', time:'Jornada completa los viernes', systems:'Interbanking, CRM, Google Sheets', status:'Auditoría manual, tarea crítica',
   desc:'Control integral y emisión de los pagos semanales por remesas para todas las sociedades del grupo.',
   steps:['Controlar las remesas asignadas a proveedores del viernes para cada empresa: HUERTAS, INV44, KIARA, PEARA, CIARA, MOVILIS, SALRA, INT BAAR, CONDOMINIOS y cualquier otra con pagos pendientes.','Comparar cada remesa contra la planilla de control interno en Google Sheets.','Generar el archivo TXT para subir a Interbanking.','Dar de alta en la plataforma bancaria los proveedores que falten.','Emitir el pago en Interbanking y avisar a Tesorería para la autorización final.']},
  {title:'Liquidación de escribanos (PEPE y GRASETTI)', freq:'Mensual', time:'2 a 3 horas', systems:'CELER, Excel', status:'Semiautomatizada',
   desc:'Liquidación de honorarios notariales importando lotes desde Excel.',
   steps:['Ingresar a CELER con el perfil de Finanzas o Compras.','Ir a Liquidaciones de honorarios, Escribanos.','Importar la planilla de Excel en lotes de hasta 50 filas (unas 25 minutas, el máximo que tolera la importación), eligiendo el escribano correspondiente. Repetir hasta liquidar todo el mes.','Controlar el reporte generado contra el Excel del escribano.','Confirmar el lote.']},
  {title:'Liquidación de gestora (MARIELA BO)', freq:'Mensual', time:'4 a 5 horas', systems:'CELER', status:'Carga manual',
   desc:'Carga individual de minutas y control de viáticos según dónde se hizo cada trámite.',
   steps:['Ingresar a CELER, Liquidación de honorarios, y buscar a la gestora.','Cargar una por una las minutas pendientes que la gestora envía en Excel a principio de mes.','Controlar los valores de cada trámite, en especial que los viáticos coincidan con el lugar del trámite.','Generar el lote.']},
  {title:'Control del servicio de remises del personal', freq:'Mensual', time:'1 a 2 horas', systems:'Google Sheets de movilidad, ERP', status:'Semiautomatizada',
   desc:'Auditoría de viajes contra las direcciones del contrato e imputación por sucursal.',
   steps:['Descargar la liquidación en Excel que envía el proveedor de remises.','Abrir el Google Sheets de control interno de movilidad.','Pegar la liquidación en la pestaña Carga Proveedor.','La planilla cruza los viajes con las direcciones del contrato y marca en rojo las diferencias.','Revisar solo las alertas, por ejemplo recorridos fuera de las sucursales habituales.','Enviar el control al proveedor para que facture.','Cargar las facturas separando cada viaje por el área que corresponde para imputar bien el gasto.']},
  {title:'Tarjetas de combustible Pan American', freq:'Semanal', time:'1 hora', systems:'Portal Pan American, sistema contable', status:'Carga con reglas de imputación',
   desc:'Descarga semanal e imputación separada entre autos en stock y atención comercial.',
   steps:['Descargar los movimientos semanales de las tarjetas.','Imputar el gasto en el sistema contable con su centro de costo.','Si son movimientos de autos en stock, imputar a Automotriz Entregas.','Si es cortesía a clientes, imputar al comercial de cada sucursal (por ejemplo KIARA 44 va a Comercial KIARA 44).']},
  {title:'Facturas de Mercado Libre por débito automático', freq:'Mensual', time:'30 minutos', systems:'Mercado Libre, ERP', status:'Regularización contable',
   desc:'Pedido y carga de comprobantes que se cobran por débito automático.',
   steps:['Pedir a Julieta Sarmiento o Tomás Ciminni que descarguen los comprobantes antes del cierre contable.','Cargar las facturas para regularizar la imputación del gasto.']},
  {title:'Facturas de Google (Marketing)', freq:'Mensual', time:'45 minutos', systems:'Portal Google, Excel de Contabilidad', status:'Carga directa',
   desc:'Unas 10 facturas que tienen que estar cargadas antes del cierre contable.',
   steps:['Pedir el reporte de inversión a Marketing o revisar el resumen de la cuenta.','Descargar las facturas del período.','Cargarlas imputando a Publicidad y Marketing antes del cierre.']},
  {title:'Servicios médicos MEDICUS y OMINT', freq:'Mensual', time:'1 hora', systems:'Portales Medicus y Omint, ERP', status:'Tarea de rutina',
   desc:'Descarga y programación de pago de unas 15 facturas mensuales.',
   steps:['Ingresar a los portales de Medicus y Omint con el usuario de la empresa.','Descargar todas las facturas del mes.','Cargarlas en el sistema para programar el pago antes del vencimiento.']},
  {title:'Tarjetas corporativas BNA Rosario', freq:'Mensual', time:'1 hora y media', systems:'Mercado Libre, portal BNA, Contabilidad', status:'Gestión con proveedores',
   desc:'Conciliación de compras en Mercado Libre y carga contable.',
   steps:['Buscar y descargar las facturas de los consumos en Mercado Libre.','Pedir a Contabilidad el alta de los proveedores que no estén registrados.','Cargar los comprobantes para regularizar el saldo de la tarjeta.']},
  {title:'Facturación diaria del área automotriz', freq:'Diaria', time:'Unas 15 horas por semana', systems:'Casilla de facturas, Autodealer, ERP', status:'Carga continua',
   desc:'Revisión permanente de la casilla compartida de facturas y carga diaria de compras.',
   steps:['Revisar el correo general donde llegan las facturas de proveedores.','Controlar que cada factura tenga su orden de compra o autorización.','Cargar el comprobante en el día para no acumular pendientes al cierre.']},
  {title:'Facturas ACARA de formularios', freq:'Semanal', time:'1 hora', systems:'Portal ACARA, ERP', status:'Carga individual',
   desc:'Carga de las facturas por compra de formularios automotores.',
   steps:['Ingresar al portal de ACARA con el usuario de la empresa.','Descargar uno por uno los comprobantes de formularios.','Cargarlos imputando a Gestoría y Trámites.']}
];

