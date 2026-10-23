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

const PROJECTS = [
  {slug:'infracciones-movilis', title:'Gestión de Infracciones Movilis', area:'Movilis Rent a Car', progress:95, status:'Finalizado al 95%',
   summary:'Agentes que monitorean e identifican temprano las multas de tránsito de la flota. La plataforma genera los PDFs, cruza y asigna cada acta y la carga en Celer, para aprovechar el 50% de descuento por pago voluntario antes del vencimiento.',
   impact:'Cerca de 100 horas menos de trabajo manual por cada lote de 500 actas',
   stack:['Scraping web','Notificaciones','Celer'],
   url:'', urlLabel:'Abrir Infracciones',
   video:true,
   metrics:[
     {label:'Generación de PDFs', manual:'~33 h', plat:'10 min', m:33, p:0.17},
     {label:'Cruce y asignación', manual:'~25 h', plat:'Segundos', m:25, p:0.01},
     {label:'Carga en Celer', manual:'~41,6 h', plat:'Minutos', m:41.6, p:0.3},
     {label:'Auditoría visual', manual:'100% de las actas', plat:'~18%', m:100, p:18, pct:true}
   ],
   flow:['Ingresa el lote de actas','La plataforma genera los PDFs','Cruza y asigna cada acta','Carga en Celer','Auditoría por muestreo, cerca del 18%','Pago con 50% de descuento'],
   shots:['Pantalla principal','Cruce y asignación de actas','PDFs generados']},

  {slug:'infracciones-usados', title:'Infracciones de unidades en stock (usados)', area:'Comercial Usados', progress:70, status:'Avance del 70%',
   summary:'Extiende el modelo de agentes para seguir las actas de infracción de los vehículos tomados en parte de pago o usados, antes de la transferencia definitiva.',
   impact:'Evita costos imprevistos al vender usados con multas',
   stack:['Python','SQL','Alertas por mail'],
   url:'', urlLabel:'Abrir herramienta',
   cursogramaOnlyImage:true,
   shots:['Consulta de actas por dominio','Alerta enviada']},

  {slug:'robot-pdf', title:'Robot lector de PDF, Sheet de control y dashboard de pagos', area:'Cuentas a Pagar', progress:100, status:'Finalizado',
   summary:'Extrae automáticamente los datos de las facturas en PDF, los consolida en un Google Sheets central y muestra el flujo de pagos de cada viernes en un dashboard.',
   impact:'8 horas por semana menos de carga manual',
   stack:['Python','Google Drive API','Dashboard'],
   url:'', urlLabel:'Abrir dashboard',
   flow:['Llega la factura en PDF','El robot extrae los datos','Se consolidan en el Sheet de control','Dashboard de pagos del viernes'],
   shots:['Extracción de datos','Dashboard de pagos']},

  {slug:'envio-comprobantes', title:'Envío automático de comprobantes y retenciones', area:'Atención a proveedores', progress:100, status:'Finalizado',
   summary:'Un flujo automático desde proveedores@gruporandazzo.com.ar envía al instante los comprobantes de pago y los certificados de retención a cada proveedor.',
   impact:'90% menos reclamos de proveedores',
   stack:['n8n','SMTP'],
   url:'', urlLabel:'Ver flujo',
   flow:['Se emite el pago','n8n detecta el comprobante y la retención','Arma el mail automáticamente','Lo envía desde proveedores@','El proveedor recibe todo sin reclamar'],
   shots:['Flujo en n8n','Mail que recibe el proveedor']},

  {slug:'conciliacion-gestoria', title:'Conciliación de la tarjeta habitualista de gestoría', area:'Gestoría automotriz', progress:50, status:'Avance del 50%',
   summary:'Aplicación web para arquear y conciliar al instante los gastos de gestoría pagados con las tarjetas corporativas habitualistas.',
   impact:'Conciliación automática contra el resumen del BNA',
   stack:['React','Supabase','Vercel'],
   url:'https://gestoria-xi.vercel.app', urlLabel:'Abrir app de Gestoría',
   cursograma:{sectors:['Gestoras externas','Conciliación (Florencia)','Contabilidad'], steps:[
     {s:0,t:'start',text:'Inicio'},
     {s:0,t:'op',text:'Hacen los trámites con la tarjeta habitualista'},
     {s:0,t:'doc',text:'Envían cupones y minutas en Excel a principio de mes'},
     {s:1,t:'op',text:'Carga en la app de Gestoría'},
     {s:1,t:'op',text:'Cruce automático contra el resumen de la tarjeta BNA'},
     {s:2,t:'op',text:'Imputación regularizada y cierre del lote'},
     {s:2,t:'end',text:'Fin'}
   ]},
   shots:['Carga de cupones','Conciliación contra el resumen']},

  {slug:'marketing-jovenes-profesionales', title:'Proyecto Marketing Jóvenes Profesionales', area:'Gerencia General y Marketing', progress:100, status:'Operativo',
   summary:'Plataforma de métricas ejecutivas que atribuye la inversión publicitaria a las ventas reales en salones y postventa.',
   impact:'Gerencia ve el retorno de cada canal de publicidad',
   stack:['React','Supabase','n8n'],
   url:'https://marketing-gr.vercel.app', urlLabel:'Abrir proyecto',
   shots:['Vista general','Retorno por canal']}
];
