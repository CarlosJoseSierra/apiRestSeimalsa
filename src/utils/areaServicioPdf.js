import PDFDocument from 'pdfkit';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

const COLORES = {
  primario: '#2446B8',
  secundario: '#0F172A',
  claro: '#EEF2FF',
  borde: '#CBD5E1',
  texto: '#1E293B',
  textoSuave: '#64748B',
  blanco: '#FFFFFF',
  verde: '#15803D'
};

function texto(valor, defecto = '') {
  if (
    valor === null ||
    valor === undefined ||
    valor === ''
  ) {
    return defecto;
  }

  return String(valor);
}

function numero(valor, decimales = 2) {
  const convertido = Number(valor);

  if (!Number.isFinite(convertido)) {
    return '0.00';
  }

  return convertido.toFixed(decimales);
}

function fechaEcuador(valor) {
  if (!valor) {
    return '';
  }

  const fecha = new Date(valor);

  if (Number.isNaN(fecha.getTime())) {
    return texto(valor);
  }

  return fecha.toLocaleDateString('es-EC', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

async function descargarImagen(url) {
  if (!url || !String(url).startsWith('http')) {
    return null;
  }

  try {
    const respuesta = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 20000
    });

    return Buffer.from(respuesta.data);
  } catch (error) {
    console.error(
      'No se pudo descargar la imagen:',
      url,
      error.message
    );

    return null;
  }
}

function necesitaPagina(doc, altoNecesario) {
  const limite =
    doc.page.height -
    doc.page.margins.bottom -
    45;

  if (doc.y + altoNecesario > limite) {
    doc.addPage();
    return true;
  }

  return false;
}

function dibujarTituloSeccion(doc, titulo) {
  necesitaPagina(doc, 42);

  const y = doc.y;

  doc
    .roundedRect(45, y, 505, 28, 5)
    .fill(COLORES.primario);

  doc
    .fillColor(COLORES.blanco)
    .font('Helvetica-Bold')
    .fontSize(11)
    .text(titulo, 58, y + 8);

  doc.y = y + 38;
}

function dibujarCampo(
  doc,
  etiqueta,
  valor,
  x,
  y,
  anchoEtiqueta,
  anchoValor
) {
  doc
    .fillColor(COLORES.textoSuave)
    .font('Helvetica-Bold')
    .fontSize(8)
    .text(etiqueta, x, y, {
      width: anchoEtiqueta
    });

  doc
    .fillColor(COLORES.texto)
    .font('Helvetica')
    .fontSize(9)
    .text(texto(valor, 'N/D'), x + anchoEtiqueta, y, {
      width: anchoValor
    });
}

function dibujarCabecera(doc, cabecera) {
  const logoPath = path.join(
    process.cwd(),
    'src',
    'assets',
    'logoSeimalsa.png'
  );

  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 45, 34, {
      fit: [85, 48],
      align: 'left'
    });
  }

  doc
    .fillColor(COLORES.primario)
    .font('Helvetica-Bold')
    .fontSize(18)
    .text(
      'REPORTE DE REPARACIÓN / COTIZACIÓN',
      145,
      38,
      {
        width: 405,
        align: 'right'
      }
    );

  doc
    .fillColor(COLORES.texto)
    .fontSize(11)
    .text(
      texto(cabecera.AS_secuencial, `CT-${cabecera.AS_id}`),
      145,
      65,
      {
        width: 405,
        align: 'right'
      }
    );

  doc
    .moveTo(45, 92)
    .lineTo(550, 92)
    .lineWidth(1)
    .strokeColor(COLORES.primario)
    .stroke();

  doc.y = 108;
}

function dibujarDatosEquipo(doc, cabecera) {
  dibujarTituloSeccion(doc, 'DATOS DEL EQUIPO');

  const y = doc.y;

  doc
    .roundedRect(45, y, 505, 76, 6)
    .lineWidth(0.8)
    .strokeColor(COLORES.borde)
    .stroke();

  dibujarCampo(
    doc,
    'SERIE:',
    cabecera.AS_serie,
    58,
    y + 13,
    55,
    140
  );

  dibujarCampo(
    doc,
    'PLACA:',
    cabecera.AS_placa,
    310,
    y + 13,
    50,
    165
  );

  dibujarCampo(
    doc,
    'MARCA:',
    cabecera.EQUIP_marca,
    58,
    y + 38,
    55,
    140
  );

  dibujarCampo(
    doc,
    'MODELO:',
    cabecera.EQUIP_modelo,
    310,
    y + 38,
    50,
    165
  );

  dibujarCampo(
    doc,
    'FECHA:',
    fechaEcuador(
      cabecera.AS_fechaReq || cabecera.AS_fecha
    ),
    58,
    y + 60,
    55,
    390
  );

  doc.y = y + 90;
}

function dibujarDatosCliente(doc, cabecera) {
  dibujarTituloSeccion(doc, 'DATOS DEL CLIENTE');

  const y = doc.y;

  doc
    .roundedRect(45, y, 505, 122, 6)
    .lineWidth(0.8)
    .strokeColor(COLORES.borde)
    .stroke();

  dibujarCampo(
    doc,
    'CLIENTE:',
    cabecera.CLI_nombre,
    58,
    y + 13,
    75,
    390
  );

  dibujarCampo(
    doc,
    'SUBCLIENTE:',
    cabecera.SC_nombre,
    58,
    y + 35,
    75,
    390
  );

  dibujarCampo(
    doc,
    'PROVINCIA:',
    cabecera.UBIC_provincia,
    58,
    y + 57,
    75,
    140
  );

  dibujarCampo(
    doc,
    'CIUDAD:',
    cabecera.UBIC_ciudad,
    310,
    y + 57,
    55,
    160
  );

  dibujarCampo(
    doc,
    'ESTABLEC.:',
    cabecera.SC_establecimiento,
    58,
    y + 79,
    75,
    390
  );

  dibujarCampo(
    doc,
    'TELÉFONO:',
    cabecera.SC_telefono,
    58,
    y + 101,
    75,
    145
  );

  dibujarCampo(
    doc,
    'TÉCNICO:',
    cabecera.Tecnico,
    310,
    y + 101,
    55,
    160
  );

  doc.y = y + 136;

  dibujarCampo(
    doc,
    'DIRECCIÓN:',
    cabecera.SC_direccion,
    45,
    doc.y,
    75,
    430
  );

  doc.moveDown(1.6);
}

function dibujarDatosServicio(doc, cabecera) {
  dibujarTituloSeccion(doc, 'INFORMACIÓN DEL SERVICIO');

  const y = doc.y;

  doc
    .roundedRect(45, y, 505, 48, 6)
    .lineWidth(0.8)
    .strokeColor(COLORES.borde)
    .stroke();

  dibujarCampo(
    doc,
    'SERVICIO:',
    cabecera.Servicio,
    58,
    y + 13,
    70,
    145
  );

  dibujarCampo(
    doc,
    'TIPO:',
    cabecera.TipoServicio,
    310,
    y + 13,
    45,
    170
  );

  doc.y = y + 62;
}

function dibujarTablaDetalles(doc, detalles) {
  dibujarTituloSeccion(doc, 'REPUESTOS / SERVICIOS');

  const columnas = {
    item: 45,
    codigo: 80,
    descripcion: 170,
    cantidad: 440
  };

  function encabezado() {
    const y = doc.y;

    doc
      .rect(45, y, 505, 24)
      .fill(COLORES.primario);

    doc
      .fillColor(COLORES.blanco)
      .font('Helvetica-Bold')
      .fontSize(8)
      .text('ITEM', columnas.item + 5, y + 8, {
        width: 30
      })
      .text('CÓDIGO', columnas.codigo, y + 8, {
        width: 85
      })
      .text('DESCRIPCIÓN', columnas.descripcion, y + 8, {
        width: 260
      })
      .text('CANT.', columnas.cantidad, y + 8, {
        width: 50,
        align: 'right'
      });

    doc.y = y + 24;
  }

  encabezado();

  detalles.forEach((detalle, indice) => {
    const descripcion = texto(
      detalle.AS_DET_PROD_descripcion,
      'SIN DESCRIPCIÓN'
    );

    const altoDescripcion = doc.heightOfString(
      descripcion,
      {
        width: 255,
        fontSize: 8
      }
    );

    const altoFila = Math.max(26, altoDescripcion + 12);

    if (
      doc.y + altoFila >
      doc.page.height -
      doc.page.margins.bottom -
      40
    ) {
      doc.addPage();
      encabezado();
    }

    const y = doc.y;
    const fondo =
      indice % 2 === 0
        ? '#FFFFFF'
        : '#F8FAFC';

    doc
      .rect(45, y, 505, altoFila)
      .fill(fondo)
      .lineWidth(0.5)
      .strokeColor(COLORES.borde)
      .stroke();

    doc
      .fillColor(COLORES.texto)
      .font('Helvetica')
      .fontSize(8)
      .text(String(indice + 1), 50, y + 8, {
        width: 25
      })
      .text(
        texto(detalle.AS_DET_PROD_codigo),
        columnas.codigo,
        y + 8,
        {
          width: 85
        }
      )
      .text(
        descripcion,
        columnas.descripcion,
        y + 7,
        {
          width: 255
        }
      )
      .text(
        numero(detalle.AS_DET_cantidad),
        columnas.cantidad,
        y + 8,
        {
          width: 45,
          align: 'right'
        }
      );
     

    doc.y = y + altoFila;
  });

  doc.moveDown(1);
}

function dibujarTotales(doc, cabecera) {
  necesitaPagina(doc, 80);

  const x = 360;
  const ancho = 190;
  const y = doc.y;

  doc
    .roundedRect(x, y, ancho, 70, 6)
    .fill('#F8FAFC')
    .lineWidth(0.8)
    .strokeColor(COLORES.borde)
    .stroke();

  dibujarCampo(
    doc,
    'SUBTOTAL:',
    `$ ${numero(cabecera.AS_Subtotal)}`,
    x + 12,
    y + 12,
    75,
    85
  );

  dibujarCampo(
    doc,
    'IVA:',
    `$ ${numero(cabecera.AS_iva)}`,
    x + 12,
    y + 32,
    75,
    85
  );

  doc
    .fillColor(COLORES.primario)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('TOTAL:', x + 12, y + 52, {
      width: 75
    })
    .text(
      `$ ${numero(cabecera.AS_total)}`,
      x + 87,
      y + 52,
      {
        width: 85,
        align: 'right'
      }
    );

  doc.y = y + 84;
}

function dibujarObservaciones(doc, cabecera) {
  dibujarTituloSeccion(doc, 'OBSERVACIONES');

  const observacion = texto(
    cabecera.AS_observacionTecnica,
    'Sin observaciones técnicas.'
  );

  const alto = Math.max(
    75,
    doc.heightOfString(observacion, {
      width: 475,
      fontSize: 9
    }) + 32
  );

  necesitaPagina(doc, alto + 10);

  const y = doc.y;

  doc
    .roundedRect(45, y, 505, alto, 6)
    .fill('#F8FAFC')
    .lineWidth(0.8)
    .strokeColor(COLORES.borde)
    .stroke();

  doc
    .fillColor(COLORES.texto)
    .font('Helvetica')
    .fontSize(9)
    .text(observacion, 60, y + 16, {
      width: 475,
      align: 'justify',
      lineGap: 3
    });

  doc.y = y + alto + 12;
}

function dibujarPiePagina(doc) {
  const paginas = doc.bufferedPageRange();

  for (
    let pagina = paginas.start;
    pagina < paginas.start + paginas.count;
    pagina++
  ) {
    doc.switchToPage(pagina);

    doc
      .moveTo(45, doc.page.height - 38)
      .lineTo(550, doc.page.height - 38)
      .lineWidth(0.5)
      .strokeColor(COLORES.borde)
      .stroke();

    doc
      .fillColor(COLORES.textoSuave)
      .font('Helvetica')
      .fontSize(7)
      .text(
        'SEIMALSA - GRUPO ALVARADO',
        45,
        doc.page.height - 29,
        {
          width: 360
        }
      )
      .text(
        `Página ${pagina + 1} de ${paginas.count}`,
        405,
        doc.page.height - 29,
        {
          width: 145,
          align: 'right'
        }
      );
  }
}

function dibujarFirmas(
  doc,
  firmaClienteBuffer,
  nombreTecnico,

) {
  const y = doc.page.height - 145;

  if (firmaClienteBuffer) {
    try {
      doc.image(firmaClienteBuffer, 70, y - 45, {
        fit: [150, 70],
        align: 'center',
        valign: 'bottom'
      });
    } catch (error) {
      console.error(
        'No se pudo insertar la firma:',
        error.message
      );
    }
  }

  doc
    .moveTo(65, y + 25)
    .lineTo(230, y + 25)
    .lineWidth(0.7)
    .strokeColor(COLORES.texto)
    .stroke();

  doc
    .fillColor(COLORES.texto)
    .font('Helvetica-Bold')
    .fontSize(8)
    .text('FIRMA DEL CLIENTE', 65, y + 31, {
      width: 165,
      align: 'center'
    });

  doc
    .moveTo(365, y + 25)
    .lineTo(530, y + 25)
    .stroke();

  doc
    .font('Helvetica-Bold')
    .text(
      texto(nombreTecnico, 'TÉCNICO'),
      365,
      y + 31,
      {
        width: 165,
        align: 'center'
      }
    )
    .font('Helvetica')
    .fontSize(7)
    .text('TÉCNICO RESPONSABLE', 365, y + 43, {
      width: 165,
      align: 'center'
    });
}

async function agregarPaginasFotografias(
  doc,
  cabecera,
  firmaBuffer,
  firmaTecnicoBuffer
) {
  const urls = [
    cabecera.AS_imagen1,
    cabecera.AS_imagen2,
    cabecera.AS_imagen3,
    cabecera.AS_imagen4,
    cabecera.AS_imagen5
  ].filter(url => Boolean(url));

  for (let i = 0; i < urls.length; i++) {
    const imagenBuffer =
      await descargarImagen(urls[i]);

    if (!imagenBuffer) {
      continue;
    }

    doc.addPage();

    doc
      .fillColor(COLORES.primario)
      .font('Helvetica-Bold')
      .fontSize(14)
      .text(
        `EVIDENCIA FOTOGRÁFICA ${i + 1}`,
        45,
        40,
        {
          width: 505,
          align: 'center'
        }
      );

    doc
      .fillColor(COLORES.textoSuave)
      .fontSize(8)
      .text(
        texto(cabecera.AS_secuencial),
        45,
        61,
        {
          width: 505,
          align: 'center'
        }
      );

    try {
      doc.image(imagenBuffer, 45, 88, {
        fit: [505, 520],
        align: 'center',
        valign: 'center'
      });
    } catch (error) {
      console.error(
        'No se pudo colocar la fotografía:',
        error.message
      );
    }

    dibujarFirmas(
      doc,
      firmaBuffer,
      cabecera.Tecnico,
      firmaTecnicoBuffer
    );
  }
}

export async function generarAreaServicioPDF(
    res,
    cabecera,
    detalles
  ) {
    const doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: 35,
        right: 45,
        bottom: 50,
        left: 45
      },
      bufferPages: true,
      autoFirstPage: true,
      info: {
        Title:
          `Reporte ${texto(cabecera.AS_secuencial)}`,
        Author: 'SEIMALSA',
        Subject:
          'Reporte de reparación y cotización',
        Creator: 'API SEIMALSA'
      }
    });
  
    const nombreArchivo =
      `reporte-${texto(
        cabecera.AS_secuencial,
        cabecera.AS_id
      )}.pdf`;
  
    res.setHeader(
      'Content-Type',
      'application/pdf'
    );
  
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${nombreArchivo}"`
    );
  
    doc.pipe(res);
  
    /*
      Descarga de las firmas
    */
    const firmaClienteBuffer =
      await descargarImagen(
        cabecera.AS_imagenfirma
      );
  
    const firmaTecnicoBuffer =
      await descargarImagen(
        cabecera.USU_firma
      );
  
    /*
      Página principal
    */
    dibujarCabecera(doc, cabecera);
    dibujarDatosEquipo(doc, cabecera);
    dibujarDatosCliente(doc, cabecera);
    dibujarDatosServicio(doc, cabecera);
  
    if (
      Array.isArray(detalles) &&
      detalles.length > 0
    ) {
      dibujarTablaDetalles(
        doc,
        detalles
      );
  
     /* dibujarTotales(
        doc,
        cabecera
      );*/
    }
  
    dibujarObservaciones(
      doc,
      cabecera
    );
  
    /*
      Dibujar firmas en el resumen solamente si caben.
      No crea una página adicional.
    */
    const espacioFirmas = 130;
    const limitePagina =
      doc.page.height -
      doc.page.margins.bottom -
      15;
  
    if (
      doc.y + espacioFirmas <= limitePagina
    ) {
      dibujarFirmas(
        doc,
        firmaClienteBuffer,
        cabecera.Tecnico,
        firmaTecnicoBuffer
      );
    }
  
    /*
      Se crea una página solamente por cada imagen
      válida y descargada.
    */
    await agregarPaginasFotografias(
      doc,
      cabecera,
      firmaClienteBuffer,
      firmaTecnicoBuffer
    );
  
    /*
      Siempre debe ir después de crear todas
      las páginas del documento.
    */
    dibujarPiePagina(doc);
  
    doc.end();
  }