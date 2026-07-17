"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generarAreaServicioPDF = generarAreaServicioPDF;
var _pdfkit = _interopRequireDefault(require("pdfkit"));
var _axios = _interopRequireDefault(require("axios"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var COLORES = {
  primario: '#2446B8',
  secundario: '#0F172A',
  claro: '#EEF2FF',
  borde: '#CBD5E1',
  texto: '#1E293B',
  textoSuave: '#64748B',
  blanco: '#FFFFFF',
  verde: '#15803D'
};
function texto(valor) {
  var defecto = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (valor === null || valor === undefined || valor === '') {
    return defecto;
  }
  return String(valor);
}
function numero(valor) {
  var decimales = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var convertido = Number(valor);
  if (!Number.isFinite(convertido)) {
    return '0.00';
  }
  return convertido.toFixed(decimales);
}
function fechaEcuador(valor) {
  if (!valor) {
    return '';
  }
  var fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) {
    return texto(valor);
  }
  return fecha.toLocaleDateString('es-EC', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}
function descargarImagen(_x) {
  return _descargarImagen.apply(this, arguments);
}
function _descargarImagen() {
  _descargarImagen = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
    var respuesta;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(!url || !String(url).startsWith('http'))) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", null);
        case 2:
          _context.prev = 2;
          _context.next = 5;
          return _axios["default"].get(url, {
            responseType: 'arraybuffer',
            timeout: 20000
          });
        case 5:
          respuesta = _context.sent;
          return _context.abrupt("return", Buffer.from(respuesta.data));
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          console.error('No se pudo descargar la imagen:', url, _context.t0.message);
          return _context.abrupt("return", null);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 9]]);
  }));
  return _descargarImagen.apply(this, arguments);
}
function necesitaPagina(doc, altoNecesario) {
  var limite = doc.page.height - doc.page.margins.bottom - 45;
  if (doc.y + altoNecesario > limite) {
    doc.addPage();
    return true;
  }
  return false;
}
function dibujarTituloSeccion(doc, titulo) {
  necesitaPagina(doc, 42);
  var y = doc.y;
  doc.roundedRect(45, y, 505, 28, 5).fill(COLORES.primario);
  doc.fillColor(COLORES.blanco).font('Helvetica-Bold').fontSize(11).text(titulo, 58, y + 8);
  doc.y = y + 38;
}
function dibujarCampo(doc, etiqueta, valor, x, y, anchoEtiqueta, anchoValor) {
  doc.fillColor(COLORES.textoSuave).font('Helvetica-Bold').fontSize(8).text(etiqueta, x, y, {
    width: anchoEtiqueta
  });
  doc.fillColor(COLORES.texto).font('Helvetica').fontSize(9).text(texto(valor, 'N/D'), x + anchoEtiqueta, y, {
    width: anchoValor
  });
}
function dibujarCabecera(doc, cabecera) {
  var logoPath = _path["default"].join(process.cwd(), 'src', 'assets', 'logoSeimalsa.png');
  if (_fs["default"].existsSync(logoPath)) {
    doc.image(logoPath, 45, 24, {
      //fit: [85, 48],
      fit: [85, 78],
      align: 'left'
    });
  }
  doc.fillColor(COLORES.primario).font('Helvetica-Bold').fontSize(18).text('REPORTE DE REPARACIÓN / COTIZACIÓN', 145, 38, {
    width: 405,
    align: 'right'
  });

  /*doc
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
    );*/

  doc.moveTo(45, 92).lineTo(550, 92).lineWidth(1).strokeColor(COLORES.primario).stroke();
  doc.y = 108;
}
function dibujarDatosEquipo(doc, cabecera) {
  dibujarTituloSeccion(doc, 'DATOS DEL EQUIPO');
  var y = doc.y;
  doc.roundedRect(45, y, 505, 76, 6).lineWidth(0.8).strokeColor(COLORES.borde).stroke();
  dibujarCampo(doc, 'SERIE:', cabecera.AS_serie, 58, y + 13, 55, 140);
  dibujarCampo(doc, 'PLACA:', cabecera.AS_placa, 310, y + 13, 50, 165);
  dibujarCampo(doc, 'MARCA:', cabecera.EQUIP_marca, 58, y + 38, 55, 140);
  dibujarCampo(doc, 'MODELO:', cabecera.EQUIP_modelo, 310, y + 38, 50, 165);
  dibujarCampo(doc, 'FECHA:', fechaEcuador(cabecera.AS_fechaReq || cabecera.AS_fecha), 58, y + 60, 55, 390);
  dibujarCampo(doc, 'LOGO', cabecera.LOGO_nombre, 310, y + 60, 50, 165);
  doc.y = y + 90;
}
function dibujarDatosCliente(doc, cabecera) {
  dibujarTituloSeccion(doc, 'DATOS DEL CLIENTE');
  var y = doc.y;
  doc.roundedRect(45, y, 505, 122, 6).lineWidth(0.8).strokeColor(COLORES.borde).stroke();
  dibujarCampo(doc, 'CLIENTE:', cabecera.CLI_nombre, 58, y + 13, 75, 390);
  dibujarCampo(doc, 'SUBCLIENTE:', cabecera.SC_nombre, 58, y + 35, 75, 390);
  dibujarCampo(doc, 'COD. SUBCLIENTE:', cabecera.SC_codUniversal, 310, y + 35, 75, 390);
  dibujarCampo(doc, 'PROVINCIA:', cabecera.UBIC_provincia, 58, y + 57, 75, 140);
  dibujarCampo(doc, 'CIUDAD:', cabecera.UBIC_ciudad, 310, y + 57, 55, 160);
  dibujarCampo(doc, 'ESTABLEC.:', cabecera.SC_establecimiento, 58, y + 79, 75, 390);
  dibujarCampo(doc, 'TELÉFONO:', cabecera.SC_telefono, 58, y + 101, 75, 145);
  dibujarCampo(doc, 'TÉCNICO:', cabecera.Tecnico, 310, y + 101, 55, 160);
  doc.y = y + 136;
  dibujarCampo(doc, 'DIRECCIÓN:', cabecera.SC_direccion, 45, doc.y, 75, 430);
  doc.moveDown(1.6);
}
function dibujarDatosServicio(doc, cabecera) {
  dibujarTituloSeccion(doc, 'INFORMACIÓN DEL SERVICIO');
  var y = doc.y;
  doc.roundedRect(45, y, 505, 48, 6).lineWidth(0.8).strokeColor(COLORES.borde).stroke();
  dibujarCampo(doc, 'SERVICIO:', cabecera.Servicio, 58, y + 13, 70, 145);
  dibujarCampo(doc, 'TIPO:', cabecera.TipoServicio, 310, y + 13, 45, 170);
  doc.y = y + 62;
}
function dibujarTablaDetalles(doc, detalles) {
  dibujarTituloSeccion(doc, 'REPUESTOS / SERVICIOS');
  var columnas = {
    item: 45,
    codigo: 80,
    descripcion: 170,
    cantidad: 440
  };
  function encabezado() {
    var y = doc.y;
    doc.rect(45, y, 505, 24).fill(COLORES.primario);
    doc.fillColor(COLORES.blanco).font('Helvetica-Bold').fontSize(8).text('ITEM', columnas.item + 5, y + 8, {
      width: 30
    }).text('CÓDIGO', columnas.codigo, y + 8, {
      width: 85
    }).text('DESCRIPCIÓN', columnas.descripcion, y + 8, {
      width: 260
    }).text('CANT.', columnas.cantidad, y + 8, {
      width: 50,
      align: 'right'
    });
    doc.y = y + 24;
  }
  encabezado();
  detalles.forEach(function (detalle, indice) {
    var descripcion = texto(detalle.AS_DET_PROD_descripcion, 'SIN DESCRIPCIÓN');
    var altoDescripcion = doc.heightOfString(descripcion, {
      width: 255,
      fontSize: 8
    });
    var altoFila = Math.max(26, altoDescripcion + 12);
    if (doc.y + altoFila > doc.page.height - doc.page.margins.bottom - 40) {
      doc.addPage();
      encabezado();
    }
    var y = doc.y;
    var fondo = indice % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
    doc.rect(45, y, 505, altoFila).fill(fondo).lineWidth(0.5).strokeColor(COLORES.borde).stroke();
    doc.fillColor(COLORES.texto).font('Helvetica').fontSize(8).text(String(indice + 1), 50, y + 8, {
      width: 25
    }).text(texto(detalle.AS_DET_PROD_codigo), columnas.codigo, y + 8, {
      width: 85
    }).text(descripcion, columnas.descripcion, y + 7, {
      width: 255
    }).text(numero(detalle.AS_DET_cantidad), columnas.cantidad, y + 8, {
      width: 45,
      align: 'right'
    });
    doc.y = y + altoFila;
  });
  doc.moveDown(1);
}
function dibujarTotales(doc, cabecera) {
  necesitaPagina(doc, 80);
  var x = 360;
  var ancho = 190;
  var y = doc.y;
  doc.roundedRect(x, y, ancho, 70, 6).fill('#F8FAFC').lineWidth(0.8).strokeColor(COLORES.borde).stroke();
  dibujarCampo(doc, 'SUBTOTAL:', "$ ".concat(numero(cabecera.AS_Subtotal)), x + 12, y + 12, 75, 85);
  dibujarCampo(doc, 'IVA:', "$ ".concat(numero(cabecera.AS_iva)), x + 12, y + 32, 75, 85);
  doc.fillColor(COLORES.primario).font('Helvetica-Bold').fontSize(10).text('TOTAL:', x + 12, y + 52, {
    width: 75
  }).text("$ ".concat(numero(cabecera.AS_total)), x + 87, y + 52, {
    width: 85,
    align: 'right'
  });
  doc.y = y + 84;
}
function dibujarObservaciones(doc, cabecera) {
  dibujarTituloSeccion(doc, 'OBSERVACIONES');
  var observacion = texto(cabecera.AS_observacionTecnica, 'Sin observaciones técnicas.');
  var alto = Math.max(75, doc.heightOfString(observacion, {
    width: 475,
    fontSize: 9
  }) + 32);
  necesitaPagina(doc, alto + 10);
  var y = doc.y;
  doc.roundedRect(45, y, 505, alto, 6).fill('#F8FAFC').lineWidth(0.8).strokeColor(COLORES.borde).stroke();
  doc.fillColor(COLORES.texto).font('Helvetica').fontSize(9).text(observacion, 60, y + 16, {
    width: 475,
    align: 'justify',
    lineGap: 3
  });
  doc.y = y + alto + 12;
}
function dibujarPiePagina(doc) {
  var paginas = doc.bufferedPageRange();
  for (var pagina = paginas.start; pagina < paginas.start + paginas.count; pagina++) {
    doc.switchToPage(pagina);
    doc.moveTo(45, doc.page.height - 38).lineTo(550, doc.page.height - 38).lineWidth(0.5).strokeColor(COLORES.borde).stroke();
    doc.fillColor(COLORES.textoSuave).font('Helvetica').fontSize(7).text('SEIMALSA - GRUPO ALVARADO', 45, doc.page.height - 29, {
      width: 360
    }).text("P\xE1gina ".concat(pagina + 1, " de ").concat(paginas.count), 405, doc.page.height - 29, {
      width: 145,
      align: 'right'
    });
  }
}
function dibujarFirmas(doc, firmaClienteBuffer, nombreTecnico, firmaTecnicoBuffer) {
  var anchoFirma = 150;
  var altoFirma = 65;
  var xCliente = 72;
  var xTecnico = 372;
  var yLinea = doc.page.height - 112;
  var yFirma = yLinea - altoFirma - 5;

  /*
    Firma del cliente
  */
  if (firmaClienteBuffer) {
    try {
      doc.image(firmaClienteBuffer, xCliente, yFirma, {
        fit: [anchoFirma, altoFirma],
        align: 'center',
        valign: 'bottom'
      });
    } catch (error) {
      console.error('No se pudo insertar la firma del cliente:', error.message);
    }
  }

  /*
    Firma del técnico
  */
  if (firmaTecnicoBuffer) {
    try {
      doc.image(firmaTecnicoBuffer, xTecnico, yFirma, {
        fit: [anchoFirma, altoFirma],
        align: 'center',
        valign: 'bottom'
      });
    } catch (error) {
      console.error('No se pudo insertar la firma del técnico:', error.message);
    }
  }

  /*
    Líneas
  */
  doc.moveTo(65, yLinea).lineTo(230, yLinea).lineWidth(0.7).strokeColor(COLORES.texto).stroke();
  doc.moveTo(365, yLinea).lineTo(530, yLinea).lineWidth(0.7).strokeColor(COLORES.texto).stroke();

  /*
    Texto de firma del cliente
  */
  doc.fillColor(COLORES.texto).font('Helvetica-Bold').fontSize(8).text('FIRMA DEL CLIENTE', 65, yLinea + 7, {
    width: 165,
    align: 'center',
    lineBreak: false
  });

  /*
    Nombre y texto del técnico
  */
  doc.font('Helvetica-Bold').fontSize(8).text(texto(nombreTecnico, 'TÉCNICO'), 365, yLinea + 7, {
    width: 165,
    align: 'center',
    lineBreak: false
  });
  doc.font('Helvetica').fontSize(7).text('TÉCNICO RESPONSABLE', 365, yLinea + 19, {
    width: 165,
    align: 'center',
    lineBreak: false
  });
}
function agregarPaginasFotografias(_x2, _x3, _x4, _x5) {
  return _agregarPaginasFotografias.apply(this, arguments);
}
function _agregarPaginasFotografias() {
  _agregarPaginasFotografias = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(doc, cabecera, firmaBuffer, firmaTecnicoBuffer) {
    var urls, i, imagenBuffer;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          urls = [cabecera.AS_imagen1, cabecera.AS_imagen2, cabecera.AS_imagen3, cabecera.AS_imagen4, cabecera.AS_imagen5].filter(function (url) {
            return Boolean(url);
          });
          i = 0;
        case 2:
          if (!(i < urls.length)) {
            _context2.next = 16;
            break;
          }
          _context2.next = 5;
          return descargarImagen(urls[i]);
        case 5:
          imagenBuffer = _context2.sent;
          if (imagenBuffer) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("continue", 13);
        case 8:
          doc.addPage();
          doc.fillColor(COLORES.primario).font('Helvetica-Bold').fontSize(14).text("EVIDENCIA FOTOGR\xC1FICA ".concat(i + 1), 45, 40, {
            width: 505,
            align: 'center'
          });
          doc.fillColor(COLORES.textoSuave).fontSize(8).text(texto(cabecera.AS_secuencial), 45, 61, {
            width: 505,
            align: 'center'
          });
          try {
            doc.image(imagenBuffer, 45, 88, {
              fit: [505, 520],
              align: 'center',
              valign: 'center'
            });
          } catch (error) {
            console.error('No se pudo colocar la fotografía:', error.message);
          }
          dibujarFirmas(doc, firmaBuffer, cabecera.Tecnico, firmaTecnicoBuffer);
        case 13:
          i++;
          _context2.next = 2;
          break;
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _agregarPaginasFotografias.apply(this, arguments);
}
function generarAreaServicioPDF(_x6, _x7, _x8) {
  return _generarAreaServicioPDF.apply(this, arguments);
}
function _generarAreaServicioPDF() {
  _generarAreaServicioPDF = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(res, cabecera, detalles) {
    var doc, nombreArchivo, firmaClienteBuffer, firmaTecnicoBuffer, espacioFirmas, limitePagina;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          doc = new _pdfkit["default"]({
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
              Title: "Reporte ".concat(texto(cabecera.AS_secuencial)),
              Author: 'SEIMALSA',
              Subject: 'Reporte de reparación y cotización',
              Creator: 'API SEIMALSA'
            }
          });
          nombreArchivo = "reporte-".concat(texto(cabecera.AS_secuencial, cabecera.AS_id), ".pdf");
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', "inline; filename=\"".concat(nombreArchivo, "\""));
          doc.pipe(res);

          /*
            Descarga de las firmas
          */
          _context3.next = 7;
          return descargarImagen(cabecera.AS_imagenfirma);
        case 7:
          firmaClienteBuffer = _context3.sent;
          _context3.next = 10;
          return descargarImagen(cabecera.USU_firma);
        case 10:
          firmaTecnicoBuffer = _context3.sent;
          /*
            Página principal
          */
          dibujarCabecera(doc, cabecera);
          dibujarDatosEquipo(doc, cabecera);
          dibujarDatosCliente(doc, cabecera);
          dibujarDatosServicio(doc, cabecera);
          if (Array.isArray(detalles) && detalles.length > 0) {
            dibujarTablaDetalles(doc, detalles);

            /* dibujarTotales(
               doc,
               cabecera
             );*/
          }

          dibujarObservaciones(doc, cabecera);

          /*
            Dibujar firmas en el resumen solamente si caben.
            No crea una página adicional.
          */
          espacioFirmas = 130;
          limitePagina = doc.page.height - doc.page.margins.bottom - 15;
          if (doc.y + espacioFirmas <= limitePagina) {
            dibujarFirmas(doc, firmaClienteBuffer, cabecera.Tecnico, firmaTecnicoBuffer);
          }

          /*
            Se crea una página solamente por cada imagen
            válida y descargada.
          */
          _context3.next = 22;
          return agregarPaginasFotografias(doc, cabecera, firmaClienteBuffer, firmaTecnicoBuffer);
        case 22:
          /*
            Siempre debe ir después de crear todas
            las páginas del documento.
          */
          //dibujarPiePagina(doc);

          doc.end();
        case 23:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _generarAreaServicioPDF.apply(this, arguments);
}