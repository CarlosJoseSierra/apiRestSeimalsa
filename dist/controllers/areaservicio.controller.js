"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAreaServicio = exports.updateActivoByTecnico = exports.obtenerPDFReparacion = exports.obtenerMapaEquipos = exports.obtenerDashboardTecnico = exports.getReporteGeneral = exports.getReparacionesXtecnico = exports.getEntregadosUnilever = exports.getEntregadosTesalia = exports.getEntregadosPronaca = exports.getEntregadosHeineken = exports.getEntregadosElRosado = exports.getEntregadosArca = exports.getEntregadosAJE = exports.getDetalleCTById = exports.getAreaSinTecnico = exports.getAreaServicioMovimiento = exports.getAreaServicioMantenimiento = exports.getAreaByTecnico = exports.getAreaBySerie = exports.getAreaByPlaca = exports.createNewAreaServicio = void 0;
var _database = require("../database");
var _areaServicioPdf = require("../utils/areaServicioPdf.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var cloudinary = require("../libs/cloudinary");
var getAreaBySerie = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context.sent;
          _context.next = 6;
          return pool.request().input("serie", req.params.serie).input("idCliente1", req.params.idCliente1).input("idCliente2", req.params.idCliente2).query(_database.querys.getAreaBySerie);
        case 6:
          result = _context.sent;
          return _context.abrupt("return", res.json(result.recordset[0]));
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(500);
          res.send(_context.t0.message);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function getAreaBySerie(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAreaBySerie = getAreaBySerie;
var getAreaByPlaca = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context2.sent;
          _context2.next = 6;
          return pool.request().input("placa", req.params.placa).input("idCliente1", req.params.idCliente1).input("idCliente2", req.params.idCliente2).query(_database.querys.getAreaByPlaca);
        case 6:
          result = _context2.sent;
          return _context2.abrupt("return", res.json(result.recordset[0]));
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          res.status(500);
          res.send(_context2.t0.message);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function getAreaByPlaca(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getAreaByPlaca = getAreaByPlaca;
var getAreaSinTecnico = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context3.sent;
          _context3.next = 6;
          return pool.request().query(_database.querys.getAreaSinTecnico);
        case 6:
          result = _context3.sent;
          return _context3.abrupt("return", res.json(result.recordset));
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          res.status(500);
          res.send(_context3.t0.message);
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function getAreaSinTecnico(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getAreaSinTecnico = getAreaSinTecnico;
var updateActivoByTecnico = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body, AS_USU_id, AS_USU_ing, pool, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, AS_USU_id = _req$body.AS_USU_id, AS_USU_ing = _req$body.AS_USU_ing; // validating
          if (!(AS_USU_id == null || AS_USU_ing == null)) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            msg: "Favor ingresar Datos Requeridos"
          }));
        case 3:
          _context4.prev = 3;
          _context4.next = 6;
          return (0, _database.getConnection)();
        case 6:
          pool = _context4.sent;
          _context4.next = 9;
          return pool.request().input("id", req.params.id).input("AS_USU_id", _database.sql.VarChar, AS_USU_id).input("AS_USU_ing", _database.sql.VarChar, AS_USU_ing).query(_database.querys.updateActivoByTecnico);
        case 9:
          result = _context4.sent;
          if (!(result.rowsAffected == 1)) {
            _context4.next = 14;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            status: "ok",
            msg: "Registro exitoso",
            token: 0
          }));
        case 14:
          return _context4.abrupt("return", res.status(400).json({
            status: "400",
            msg: "No se pudo registrar, consulte al administrador",
            token: 0
          }));
        case 15:
          _context4.next = 21;
          break;
        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](3);
          res.status(500);
          res.send(_context4.t0.message);
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 17]]);
  }));
  return function updateActivoByTecnico(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.updateActivoByTecnico = updateActivoByTecnico;
var getAreaByTecnico = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context5.sent;
          _context5.next = 6;
          return pool.request().input("id", req.params.id).query(_database.querys.getAreaByTecnico);
        case 6:
          result = _context5.sent;
          return _context5.abrupt("return", res.json(result.recordset));
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          res.status(500);
          res.send(_context5.t0.message);
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function getAreaByTecnico(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getAreaByTecnico = getAreaByTecnico;
var updateAreaServicio = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var idSub, subcliente, areaServicioId, pool, result, _result$recordset, _result$recordset$, _ref7, _req$body$details, _req$body$Serie, _req$body$Placa, _req$body$Observacion, _req$body$Subtotal, _req$body$IVA, _req$body$Total, _result$recordset2, _registro$status, _registro$msg, archivos, imagenes, firma, _iterator, _step, archivo, resultadoCloudinary, detallesRecibidos, detallesArray, detalles, estadoSeimalsa, estadoMovimiento, servicio, _pool, _result, registro, _ref8, _error$originalError$, _error$originalError, _error$originalError$2;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          idSub = 0;
          subcliente = req.body.Subcliente;
          areaServicioId = Number(req.params.id);
          if (isNaN(Number(subcliente))) {
            _context6.next = 7;
            break;
          }
          idSub = subcliente;
          _context6.next = 14;
          break;
        case 7:
          _context6.next = 9;
          return (0, _database.getConnection)();
        case 9:
          pool = _context6.sent;
          _context6.next = 12;
          return pool.request().input('SC_nombre', _database.sql.VarChar, subcliente).input('SC_codUniversal', _database.sql.VarChar, req.body.CodigoS).input('SC_establecimiento', _database.sql.VarChar, req.body.Establecimiento).input('SC_direccion', _database.sql.VarChar, req.body.Direccion).input('SC_telefono', _database.sql.VarChar, req.body.Telefono).input('SC_USU_ing', _database.sql.Decimal, req.body.USU_id).query(_database.querys.createSubcliente);
        case 12:
          result = _context6.sent;
          if (result.rowsAffected[0] == 1) {
            if (result.recordset.length > 0) {
              idSub = (_result$recordset = result.recordset) === null || _result$recordset === void 0 ? void 0 : (_result$recordset$ = _result$recordset[0]) === null || _result$recordset$ === void 0 ? void 0 : _result$recordset$.SC_id;
            }
          }
        case 14:
          _context6.prev = 14;
          archivos = Array.isArray(req.files) ? req.files : [];
          imagenes = [];
          firma = '';
          _iterator = _createForOfIteratorHelper(archivos);
          _context6.prev = 19;
          _iterator.s();
        case 21:
          if ((_step = _iterator.n()).done) {
            _context6.next = 29;
            break;
          }
          archivo = _step.value;
          _context6.next = 25;
          return cloudinary.uploader.upload(archivo.path, {
            folder: 'seimalsa'
          });
        case 25:
          resultadoCloudinary = _context6.sent;
          if (archivo.originalname.toLowerCase().includes('firma')) {
            firma = resultadoCloudinary.secure_url;
          } else if (imagenes.length < 5) {
            imagenes.push(resultadoCloudinary.secure_url);
          }
        case 27:
          _context6.next = 21;
          break;
        case 29:
          _context6.next = 34;
          break;
        case 31:
          _context6.prev = 31;
          _context6.t0 = _context6["catch"](19);
          _iterator.e(_context6.t0);
        case 34:
          _context6.prev = 34;
          _iterator.f();
          return _context6.finish(34);
        case 37:
          while (imagenes.length < 5) {
            imagenes.push('');
          }
          detallesRecibidos = (_ref7 = (_req$body$details = req.body['details[]']) !== null && _req$body$details !== void 0 ? _req$body$details : req.body.details) !== null && _ref7 !== void 0 ? _ref7 : [];
          detallesArray = Array.isArray(detallesRecibidos) ? detallesRecibidos : detallesRecibidos ? [detallesRecibidos] : [];
          detalles = detallesArray.map(function (detalle) {
            if (typeof detalle === 'string') {
              return JSON.parse(detalle);
            }
            return detalle;
          });
          if (!(detalles.length === 0)) {
            _context6.next = 43;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            status: 'error',
            msg: 'Debe agregar al menos un producto.',
            token: 0
          }));
        case 43:
          estadoSeimalsa = 4;
          estadoMovimiento = 10;
          servicio = Number(req.body.Servicio);
          if (servicio === 2) {
            estadoSeimalsa = Number(req.body.Estado);
          }
          if (servicio === 4) {
            estadoMovimiento = Number(req.body.Estado);
          }
          _context6.next = 50;
          return (0, _database.getConnection)();
        case 50:
          _pool = _context6.sent;
          _context6.next = 53;
          return _pool.request().input('AS_id', _database.sql.Decimal(18, 0), areaServicioId).input('AS_SS_id', _database.sql.Decimal(18, 0), Number(req.body.Servicio)).input('AS_USU_id', _database.sql.Decimal(18, 0), Number(req.body.USU_id)).input('AS_CLI_id', _database.sql.Decimal(18, 0), Number(req.body.Cliente)).input('AS_TPS_id', _database.sql.Decimal(18, 0), Number(req.body.TipoServicio)).input('AS_UBIC_id', _database.sql.Decimal(18, 0), Number(req.body.Ciudad)).input('AS_serie', _database.sql.VarChar(100), (_req$body$Serie = req.body.Serie) !== null && _req$body$Serie !== void 0 ? _req$body$Serie : '').input('AS_placa', _database.sql.VarChar(100), (_req$body$Placa = req.body.Placa) !== null && _req$body$Placa !== void 0 ? _req$body$Placa : '').input('AS_EQUIP_id', _database.sql.Decimal(18, 0), Number(req.body.Modelo)).input('AS_LOGO_id', _database.sql.Decimal(18, 0), Number(req.body.Logo)).input('AS_observacionTecnica', _database.sql.VarChar(_database.sql.MAX), (_req$body$Observacion = req.body.ObservacionTec) !== null && _req$body$Observacion !== void 0 ? _req$body$Observacion : '').input('AS_Subtotal', _database.sql.Decimal(18, 2), Number((_req$body$Subtotal = req.body.Subtotal) !== null && _req$body$Subtotal !== void 0 ? _req$body$Subtotal : 0)).input('AS_impuesto', _database.sql.Decimal(18, 2), 15).input('AS_iva', _database.sql.Decimal(18, 2), Number((_req$body$IVA = req.body.IVA) !== null && _req$body$IVA !== void 0 ? _req$body$IVA : 0)).input('AS_total', _database.sql.Decimal(18, 2), Number((_req$body$Total = req.body.Total) !== null && _req$body$Total !== void 0 ? _req$body$Total : 0)).input('AS_SC_id', _database.sql.Decimal(18, 0), idSub).input('AS_ES_id', _database.sql.Decimal(18, 0), estadoSeimalsa).input('AS_EM_id', _database.sql.Decimal(18, 0), estadoMovimiento).input('AS_SEDE_id', _database.sql.Decimal(18, 0), 0).input('AS_imagen1', _database.sql.VarChar(1000), imagenes[0]).input('AS_imagen2', _database.sql.VarChar(1000), imagenes[1]).input('AS_imagen3', _database.sql.VarChar(1000), imagenes[2]).input('AS_imagen4', _database.sql.VarChar(1000), imagenes[3]).input('AS_imagen5', _database.sql.VarChar(1000), imagenes[4]).input('AS_imagenfirma', _database.sql.VarChar(1000), firma).input('DetallesJSON', _database.sql.NVarChar(_database.sql.MAX), JSON.stringify(detalles)).input('latitud', _database.sql.Decimal(18, 7), Number(req.body.Latitud)).input('longitud', _database.sql.Decimal(18, 7), Number(req.body.Longitud)).input('precision', _database.sql.Decimal(18, 2), Number(req.body.PrecisionGPS)).input('idEquipoCompleto', _database.sql.Decimal(18, 0), Number(req.body.idEquipoCompleto)).execute('dbo.sp_AreaServicio_ActualizarCompleto');
        case 53:
          _result = _context6.sent;
          registro = (_result$recordset2 = _result.recordset) === null || _result$recordset2 === void 0 ? void 0 : _result$recordset2[0];
          return _context6.abrupt("return", res.status(200).json({
            status: (_registro$status = registro === null || registro === void 0 ? void 0 : registro.status) !== null && _registro$status !== void 0 ? _registro$status : 'ok',
            msg: (_registro$msg = registro === null || registro === void 0 ? void 0 : registro.msg) !== null && _registro$msg !== void 0 ? _registro$msg : 'Registro exitoso',
            token: 0,
            data: {
              AS_id: registro === null || registro === void 0 ? void 0 : registro.AS_id,
              AS_secuencial: registro === null || registro === void 0 ? void 0 : registro.AS_secuencial,
              cantidadDetalles: registro === null || registro === void 0 ? void 0 : registro.cantidadDetalles
            }
          }));
        case 58:
          _context6.prev = 58;
          _context6.t1 = _context6["catch"](14);
          console.error('Error insertando AREA_SERVICIO:', _context6.t1);
          return _context6.abrupt("return", res.status(500).json({
            status: 'error',
            msg: (_ref8 = (_error$originalError$ = _context6.t1 === null || _context6.t1 === void 0 ? void 0 : (_error$originalError = _context6.t1.originalError) === null || _error$originalError === void 0 ? void 0 : (_error$originalError$2 = _error$originalError.info) === null || _error$originalError$2 === void 0 ? void 0 : _error$originalError$2.message) !== null && _error$originalError$ !== void 0 ? _error$originalError$ : _context6.t1 === null || _context6.t1 === void 0 ? void 0 : _context6.t1.message) !== null && _ref8 !== void 0 ? _ref8 : 'No se pudo registrar la cotización.',
            token: 0
          }));
        case 62:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[14, 58], [19, 31, 34, 37]]);
  }));
  return function updateAreaServicio(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updateAreaServicio = updateAreaServicio;
var createNewAreaServicio = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var idSub, idEquipo, subcliente, pool, result, _pool2, _result2, _result2$recordset, _result2$recordset$, _ref10, _req$body$details2, _req$body$Serie2, _req$body$Placa2, _req$body$Observacion2, _req$body$Subtotal2, _req$body$IVA2, _req$body$Total2, _result3$recordset, _registro$status2, _registro$msg2, archivos, imagenes, firma, _iterator2, _step2, archivo, resultadoCloudinary, detallesRecibidos, detallesArray, detalles, estadoSeimalsa, estadoMovimiento, servicio, _pool3, _result3, registro, _ref11, _error$originalError$3, _error$originalError2, _error$originalError3;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          idSub = 0;
          idEquipo = 0;
          subcliente = req.body.Subcliente;
          if (isNaN(Number(subcliente))) {
            _context7.next = 14;
            break;
          }
          idSub = subcliente;
          _context7.next = 7;
          return (0, _database.getConnection)();
        case 7:
          pool = _context7.sent;
          _context7.next = 10;
          return pool.request().input('SC_id', _database.sql.Decimal, idSub).input('SC_codUniversal', _database.sql.VarChar, req.body.CodigoS).query(_database.querys.updateSubcliente);
        case 10:
          result = _context7.sent;
          if (result.rowsAffected == 1) {
            // if (result.recordset.length > 0) {
            //idSub = result.recordset?.[0]?.SC_id;
            //}
          }
          _context7.next = 21;
          break;
        case 14:
          _context7.next = 16;
          return (0, _database.getConnection)();
        case 16:
          _pool2 = _context7.sent;
          _context7.next = 19;
          return _pool2.request().input('SC_nombre', _database.sql.VarChar, subcliente).input('SC_establecimiento', _database.sql.VarChar, req.body.Establecimiento).input('SC_codUniversal', _database.sql.VarChar, req.body.CodigoS).input('SC_direccion', _database.sql.VarChar, req.body.Direccion).input('SC_telefono', _database.sql.VarChar, req.body.Telefono).input('SC_USU_ing', _database.sql.Decimal, req.body.USU_id).query(_database.querys.createSubcliente);
        case 19:
          _result2 = _context7.sent;
          if (_result2.rowsAffected[0] == 1) {
            if (_result2.recordset.length > 0) {
              idSub = (_result2$recordset = _result2.recordset) === null || _result2$recordset === void 0 ? void 0 : (_result2$recordset$ = _result2$recordset[0]) === null || _result2$recordset$ === void 0 ? void 0 : _result2$recordset$.SC_id;
            }
          }
        case 21:
          _context7.prev = 21;
          archivos = Array.isArray(req.files) ? req.files : [];
          imagenes = [];
          firma = '';
          _iterator2 = _createForOfIteratorHelper(archivos);
          _context7.prev = 26;
          _iterator2.s();
        case 28:
          if ((_step2 = _iterator2.n()).done) {
            _context7.next = 36;
            break;
          }
          archivo = _step2.value;
          _context7.next = 32;
          return cloudinary.uploader.upload(archivo.path, {
            folder: 'seimalsa'
          });
        case 32:
          resultadoCloudinary = _context7.sent;
          if (archivo.originalname.toLowerCase().includes('firma')) {
            firma = resultadoCloudinary.secure_url;
          } else if (imagenes.length < 5) {
            imagenes.push(resultadoCloudinary.secure_url);
          }
        case 34:
          _context7.next = 28;
          break;
        case 36:
          _context7.next = 41;
          break;
        case 38:
          _context7.prev = 38;
          _context7.t0 = _context7["catch"](26);
          _iterator2.e(_context7.t0);
        case 41:
          _context7.prev = 41;
          _iterator2.f();
          return _context7.finish(41);
        case 44:
          while (imagenes.length < 5) {
            imagenes.push('');
          }
          detallesRecibidos = (_ref10 = (_req$body$details2 = req.body['details[]']) !== null && _req$body$details2 !== void 0 ? _req$body$details2 : req.body.details) !== null && _ref10 !== void 0 ? _ref10 : [];
          detallesArray = Array.isArray(detallesRecibidos) ? detallesRecibidos : detallesRecibidos ? [detallesRecibidos] : [];
          detalles = detallesArray.map(function (detalle) {
            if (typeof detalle === 'string') {
              return JSON.parse(detalle);
            }
            return detalle;
          });
          if (!(detalles.length === 0)) {
            _context7.next = 50;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            status: 'error',
            msg: 'Debe agregar al menos un producto.',
            token: 0
          }));
        case 50:
          estadoSeimalsa = 4;
          estadoMovimiento = 10;
          servicio = Number(req.body.Servicio);
          if (servicio === 2) {
            estadoSeimalsa = Number(req.body.Estado);
          }
          if (servicio === 4) {
            estadoMovimiento = Number(req.body.Estado);
          }
          _context7.next = 57;
          return (0, _database.getConnection)();
        case 57:
          _pool3 = _context7.sent;
          _context7.next = 60;
          return _pool3.request().input('AS_SS_id', _database.sql.Decimal(18, 0), Number(req.body.Servicio)).input('AS_USU_id', _database.sql.Decimal(18, 0), Number(req.body.USU_id)).input('AS_CLI_id', _database.sql.Decimal(18, 0), Number(req.body.Cliente)).input('AS_TPS_id', _database.sql.Decimal(18, 0), Number(req.body.TipoServicio)).input('AS_UBIC_id', _database.sql.Decimal(18, 0), Number(req.body.Ciudad)).input('AS_serie', _database.sql.VarChar(100), (_req$body$Serie2 = req.body.Serie) !== null && _req$body$Serie2 !== void 0 ? _req$body$Serie2 : '').input('AS_placa', _database.sql.VarChar(100), (_req$body$Placa2 = req.body.Placa) !== null && _req$body$Placa2 !== void 0 ? _req$body$Placa2 : '').input('AS_EQUIP_id', _database.sql.Decimal(18, 0), Number(req.body.Modelo)).input('AS_LOGO_id', _database.sql.Decimal(18, 0), Number(req.body.Logo)).input('AS_observacionTecnica', _database.sql.VarChar(_database.sql.MAX), (_req$body$Observacion2 = req.body.ObservacionTec) !== null && _req$body$Observacion2 !== void 0 ? _req$body$Observacion2 : '').input('AS_Subtotal', _database.sql.Decimal(18, 2), Number((_req$body$Subtotal2 = req.body.Subtotal) !== null && _req$body$Subtotal2 !== void 0 ? _req$body$Subtotal2 : 0)).input('AS_impuesto', _database.sql.Decimal(18, 2), 15).input('AS_iva', _database.sql.Decimal(18, 2), Number((_req$body$IVA2 = req.body.IVA) !== null && _req$body$IVA2 !== void 0 ? _req$body$IVA2 : 0)).input('AS_total', _database.sql.Decimal(18, 2), Number((_req$body$Total2 = req.body.Total) !== null && _req$body$Total2 !== void 0 ? _req$body$Total2 : 0)).input('AS_SC_id', _database.sql.Decimal(18, 0), idSub).input('AS_ES_id', _database.sql.Decimal(18, 0), estadoSeimalsa).input('AS_EM_id', _database.sql.Decimal(18, 0), estadoMovimiento).input('AS_SEDE_id', _database.sql.Decimal(18, 0), 0).input('AS_imagen1', _database.sql.VarChar(1000), imagenes[0]).input('AS_imagen2', _database.sql.VarChar(1000), imagenes[1]).input('AS_imagen3', _database.sql.VarChar(1000), imagenes[2]).input('AS_imagen4', _database.sql.VarChar(1000), imagenes[3]).input('AS_imagen5', _database.sql.VarChar(1000), imagenes[4]).input('AS_imagenfirma', _database.sql.VarChar(1000), firma).input('DetallesJSON', _database.sql.NVarChar(_database.sql.MAX), JSON.stringify(detalles)).input('latitud', _database.sql.Decimal(18, 7), Number(req.body.Latitud)).input('longitud', _database.sql.Decimal(18, 7), Number(req.body.Longitud)).input('precision', _database.sql.Decimal(18, 2), Number(req.body.PrecisionGPS)).input('idEquipoCompleto', _database.sql.Decimal(18, 0), Number(req.body.idEquipoCompleto)).input('codTag', _database.sql.Varchar(50), req.body.QR).execute('dbo.sp_AreaServicio_InsertarCompleto');
        case 60:
          _result3 = _context7.sent;
          registro = (_result3$recordset = _result3.recordset) === null || _result3$recordset === void 0 ? void 0 : _result3$recordset[0];
          return _context7.abrupt("return", res.status(200).json({
            status: (_registro$status2 = registro === null || registro === void 0 ? void 0 : registro.status) !== null && _registro$status2 !== void 0 ? _registro$status2 : 'ok',
            msg: (_registro$msg2 = registro === null || registro === void 0 ? void 0 : registro.msg) !== null && _registro$msg2 !== void 0 ? _registro$msg2 : 'Registro exitoso',
            token: 0,
            data: {
              AS_id: registro === null || registro === void 0 ? void 0 : registro.AS_id,
              AS_secuencial: registro === null || registro === void 0 ? void 0 : registro.AS_secuencial,
              cantidadDetalles: registro === null || registro === void 0 ? void 0 : registro.cantidadDetalles
            }
          }));
        case 65:
          _context7.prev = 65;
          _context7.t1 = _context7["catch"](21);
          console.error('Error insertando FIRMA:', _context7.t1);
          return _context7.abrupt("return", res.status(500).json({
            status: 'error',
            msg: (_ref11 = (_error$originalError$3 = _context7.t1 === null || _context7.t1 === void 0 ? void 0 : (_error$originalError2 = _context7.t1.originalError) === null || _error$originalError2 === void 0 ? void 0 : (_error$originalError3 = _error$originalError2.info) === null || _error$originalError3 === void 0 ? void 0 : _error$originalError3.message) !== null && _error$originalError$3 !== void 0 ? _error$originalError$3 : _context7.t1 === null || _context7.t1 === void 0 ? void 0 : _context7.t1.message) !== null && _ref11 !== void 0 ? _ref11 : 'No se pudo registrar la firma.',
            token: 0
          }));
        case 69:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[21, 65], [26, 38, 41, 44]]);
  }));
  return function createNewAreaServicio(_x13, _x14) {
    return _ref9.apply(this, arguments);
  };
}();
exports.createNewAreaServicio = createNewAreaServicio;
var getAreaServicioMovimiento = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context8.sent;
          _context8.next = 6;
          return pool.request().query(_database.querys.getAreaByMovimiento);
        case 6:
          result = _context8.sent;
          return _context8.abrupt("return", res.json(result.recordset[0]));
        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          res.status(500);
          res.send(_context8.t0.message);
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 10]]);
  }));
  return function getAreaServicioMovimiento(_x15, _x16) {
    return _ref12.apply(this, arguments);
  };
}();
exports.getAreaServicioMovimiento = getAreaServicioMovimiento;
var getAreaServicioMantenimiento = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context9.sent;
          _context9.next = 6;
          return pool.request().query(_database.querys.getAreaByMantenimiento);
        case 6:
          result = _context9.sent;
          return _context9.abrupt("return", res.json(result.recordset[0]));
        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](0);
          res.status(500);
          res.send(_context9.t0.message);
        case 14:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 10]]);
  }));
  return function getAreaServicioMantenimiento(_x17, _x18) {
    return _ref13.apply(this, arguments);
  };
}();
exports.getAreaServicioMantenimiento = getAreaServicioMantenimiento;
var getReporteGeneral = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context10.sent;
          _context10.next = 6;
          return pool.request().query(_database.querys.getReporteGeneralSabana);
        case 6:
          result = _context10.sent;
          return _context10.abrupt("return", res.json(result.recordset));
        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](0);
          res.status(500);
        case 13:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 10]]);
  }));
  return function getReporteGeneral(_x19, _x20) {
    return _ref14.apply(this, arguments);
  };
}();
exports.getReporteGeneral = getReporteGeneral;
var getEntregadosHeineken = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context11.sent;
          _context11.next = 6;
          return pool.request().query(_database.querys.getEntregaGeneralHeineken);
        case 6:
          result = _context11.sent;
          return _context11.abrupt("return", res.json(result.recordset));
        case 10:
          _context11.prev = 10;
          _context11.t0 = _context11["catch"](0);
          res.status(500);
        case 13:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 10]]);
  }));
  return function getEntregadosHeineken(_x21, _x22) {
    return _ref15.apply(this, arguments);
  };
}();
exports.getEntregadosHeineken = getEntregadosHeineken;
var getEntregadosPronaca = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context12.sent;
          _context12.next = 6;
          return pool.request().query(_database.querys.getEntregaGeneralPronaca);
        case 6:
          result = _context12.sent;
          return _context12.abrupt("return", res.json(result.recordset));
        case 10:
          _context12.prev = 10;
          _context12.t0 = _context12["catch"](0);
          res.status(500);
        case 13:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 10]]);
  }));
  return function getEntregadosPronaca(_x23, _x24) {
    return _ref16.apply(this, arguments);
  };
}();
exports.getEntregadosPronaca = getEntregadosPronaca;
var getEntregadosTesalia = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context13.sent;
          _context13.next = 6;
          return pool.request().query(_database.querys.getEntregaGeneralTesalia);
        case 6:
          result = _context13.sent;
          return _context13.abrupt("return", res.json(result.recordset));
        case 10:
          _context13.prev = 10;
          _context13.t0 = _context13["catch"](0);
          res.status(500);
        case 13:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 10]]);
  }));
  return function getEntregadosTesalia(_x25, _x26) {
    return _ref17.apply(this, arguments);
  };
}();
exports.getEntregadosTesalia = getEntregadosTesalia;
var getEntregadosUnilever = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context14.sent;
          _context14.next = 6;
          return pool.request().query(_database.querys.getEntregaGeneralUnilever);
        case 6:
          result = _context14.sent;
          return _context14.abrupt("return", res.json(result.recordset));
        case 10:
          _context14.prev = 10;
          _context14.t0 = _context14["catch"](0);
          res.status(500);
        case 13:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 10]]);
  }));
  return function getEntregadosUnilever(_x27, _x28) {
    return _ref18.apply(this, arguments);
  };
}();
exports.getEntregadosUnilever = getEntregadosUnilever;
var getEntregadosAJE = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context15.sent;
          _context15.next = 6;
          return pool.request().query(_database.querys.getEntregaGeneralAJE);
        case 6:
          result = _context15.sent;
          return _context15.abrupt("return", res.json(result.recordset));
        case 10:
          _context15.prev = 10;
          _context15.t0 = _context15["catch"](0);
          res.status(500);
        case 13:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 10]]);
  }));
  return function getEntregadosAJE(_x29, _x30) {
    return _ref19.apply(this, arguments);
  };
}();
exports.getEntregadosAJE = getEntregadosAJE;
var getEntregadosElRosado = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context16.sent;
          _context16.next = 6;
          return pool.request().query(_database.querys.getEntregaGeneralElRosado);
        case 6:
          result = _context16.sent;
          return _context16.abrupt("return", res.json(result.recordset));
        case 10:
          _context16.prev = 10;
          _context16.t0 = _context16["catch"](0);
          res.status(500);
        case 13:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 10]]);
  }));
  return function getEntregadosElRosado(_x31, _x32) {
    return _ref20.apply(this, arguments);
  };
}();
exports.getEntregadosElRosado = getEntregadosElRosado;
var getEntregadosArca = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context17.sent;
          _context17.next = 6;
          return pool.request().query(_database.querys.getEntregaGeneralArca);
        case 6:
          result = _context17.sent;
          return _context17.abrupt("return", res.json(result.recordset));
        case 10:
          _context17.prev = 10;
          _context17.t0 = _context17["catch"](0);
          res.status(500);
        case 13:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 10]]);
  }));
  return function getEntregadosArca(_x33, _x34) {
    return _ref21.apply(this, arguments);
  };
}();
exports.getEntregadosArca = getEntregadosArca;
var getDetalleCTById = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context18.sent;
          _context18.next = 6;
          return pool.request().input("id", req.params.id).query(_database.querys.getDetalleCTById);
        case 6:
          result = _context18.sent;
          return _context18.abrupt("return", res.json(result.recordset));
        case 10:
          _context18.prev = 10;
          _context18.t0 = _context18["catch"](0);
          res.status(500);
        case 13:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 10]]);
  }));
  return function getDetalleCTById(_x35, _x36) {
    return _ref22.apply(this, arguments);
  };
}();
exports.getDetalleCTById = getDetalleCTById;
var getReparacionesXtecnico = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var idTecnico, pool, result, jsonResult, data, finalArray;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          idTecnico = req.params.idTecnico;
          _context19.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context19.sent;
          _context19.next = 7;
          return pool.request().input("idTecnico", _database.sql.Decimal, idTecnico).execute('sp_Ventas_GetRepairPorTecnico');
        case 7:
          result = _context19.sent;
          if (!(!result.recordset || result.recordset.length === 0)) {
            _context19.next = 10;
            break;
          }
          return _context19.abrupt("return", res.json([]));
        case 10:
          jsonResult = result.recordset.map(function (row) {
            return Object.values(row)[0];
          }).join('');
          if (jsonResult) {
            _context19.next = 13;
            break;
          }
          return _context19.abrupt("return", res.json([]));
        case 13:
          data = JSON.parse(jsonResult);
          finalArray = data.repairs ? data.repairs : data;
          res.json(finalArray);
          _context19.next = 21;
          break;
        case 18:
          _context19.prev = 18;
          _context19.t0 = _context19["catch"](0);
          res.status(500).send({
            message: "Error interno del servidor al procesar la solicitud.",
            error: _context19.t0.message
          });
        case 21:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 18]]);
  }));
  return function getReparacionesXtecnico(_x37, _x38) {
    return _ref23.apply(this, arguments);
  };
}();
exports.getReparacionesXtecnico = getReparacionesXtecnico;
var obtenerPDFReparacion = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    var _result$recordsets, _result$recordsets$, _result$recordsets2, id, pool, result, cabecera, detalles, _error$originalError4, _error$originalError5;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          id = Number(req.params.id);
          if (!(!Number.isFinite(id) || id <= 0)) {
            _context20.next = 4;
            break;
          }
          return _context20.abrupt("return", res.status(400).json({
            status: 'error',
            msg: 'El ID de AREA_SERVICIO no es válido.'
          }));
        case 4:
          _context20.next = 6;
          return (0, _database.getConnection)();
        case 6:
          pool = _context20.sent;
          _context20.next = 9;
          return pool.request().input('AS_id', _database.sql.Decimal(18, 0), id).execute('dbo.sp_AreaServicio_ObtenerReportePDF');
        case 9:
          result = _context20.sent;
          cabecera = (_result$recordsets = result.recordsets) === null || _result$recordsets === void 0 ? void 0 : (_result$recordsets$ = _result$recordsets[0]) === null || _result$recordsets$ === void 0 ? void 0 : _result$recordsets$[0];
          detalles = ((_result$recordsets2 = result.recordsets) === null || _result$recordsets2 === void 0 ? void 0 : _result$recordsets2[1]) || [];
          if (cabecera) {
            _context20.next = 14;
            break;
          }
          return _context20.abrupt("return", res.status(404).json({
            status: 'error',
            msg: 'No se encontró la reparación solicitada.'
          }));
        case 14:
          _context20.next = 16;
          return (0, _areaServicioPdf.generarAreaServicioPDF)(res, cabecera, detalles);
        case 16:
          _context20.next = 24;
          break;
        case 18:
          _context20.prev = 18;
          _context20.t0 = _context20["catch"](0);
          console.error('Error generando el PDF:', _context20.t0);

          /*
            No se puede enviar JSON si el PDF ya comenzó
            a escribirse en la respuesta.
          */
          if (res.headersSent) {
            _context20.next = 23;
            break;
          }
          return _context20.abrupt("return", res.status(500).json({
            status: 'error',
            msg: (_context20.t0 === null || _context20.t0 === void 0 ? void 0 : (_error$originalError4 = _context20.t0.originalError) === null || _error$originalError4 === void 0 ? void 0 : (_error$originalError5 = _error$originalError4.info) === null || _error$originalError5 === void 0 ? void 0 : _error$originalError5.message) || (_context20.t0 === null || _context20.t0 === void 0 ? void 0 : _context20.t0.message) || 'No se pudo generar el PDF.'
          }));
        case 23:
          res.end();
        case 24:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 18]]);
  }));
  return function obtenerPDFReparacion(_x39, _x40) {
    return _ref24.apply(this, arguments);
  };
}();
exports.obtenerPDFReparacion = obtenerPDFReparacion;
var obtenerMapaEquipos = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    var clienteId, pool, result, _error$originalError6, _error$originalError7;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          clienteId = req.query.clienteId ? Number(req.query.clienteId) : null;
          _context21.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context21.sent;
          _context21.next = 7;
          return pool.request()
          /*.input(
            'AS_CLI_id',
            sql.Decimal(18, 0),
            clienteId
          )*/.execute('dbo.sp_AreaServicio_ObtenerMapaEquipos');
        case 7:
          result = _context21.sent;
          return _context21.abrupt("return", res.status(200).json({
            status: 'ok',
            msg: result.recordset.length,
            token: result.recordset
          }));
        case 11:
          _context21.prev = 11;
          _context21.t0 = _context21["catch"](0);
          console.error('Error consultando mapa:', _context21.t0);
          return _context21.abrupt("return", res.status(500).json({
            status: 'error',
            msg: (_context21.t0 === null || _context21.t0 === void 0 ? void 0 : (_error$originalError6 = _context21.t0.originalError) === null || _error$originalError6 === void 0 ? void 0 : (_error$originalError7 = _error$originalError6.info) === null || _error$originalError7 === void 0 ? void 0 : _error$originalError7.message) || (_context21.t0 === null || _context21.t0 === void 0 ? void 0 : _context21.t0.message) || 'No se pudieron obtener las ubicaciones.'
          }));
        case 15:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[0, 11]]);
  }));
  return function obtenerMapaEquipos(_x41, _x42) {
    return _ref25.apply(this, arguments);
  };
}();
exports.obtenerMapaEquipos = obtenerMapaEquipos;
var obtenerDashboardTecnico = /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
    var _result$recordsets3, _result$recordsets3$, _result$recordsets4, _result$recordsets5, _result$recordsets6, _result$recordsets7, _result$recordsets8, _result$recordsets9, _result$recordsets10, _result$recordsets10$, usuarioId, pool, result, _error$originalError8, _error$originalError9;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          usuarioId = Number(req.params.usuarioId);
          if (!(!Number.isFinite(usuarioId) || usuarioId <= 0)) {
            _context22.next = 4;
            break;
          }
          return _context22.abrupt("return", res.status(400).json({
            status: 'error',
            msg: 'El usuario no es válido.'
          }));
        case 4:
          _context22.next = 6;
          return (0, _database.getConnection)();
        case 6:
          pool = _context22.sent;
          _context22.next = 9;
          return pool.request().input('USU_id', _database.sql.Decimal(18, 0), usuarioId).execute('dbo.sp_DashboardTecnico');
        case 9:
          result = _context22.sent;
          return _context22.abrupt("return", res.status(200).json({
            status: 'ok',
            data: {
              resumen: ((_result$recordsets3 = result.recordsets) === null || _result$recordsets3 === void 0 ? void 0 : (_result$recordsets3$ = _result$recordsets3[0]) === null || _result$recordsets3$ === void 0 ? void 0 : _result$recordsets3$[0]) || {},
              actividadSemanal: ((_result$recordsets4 = result.recordsets) === null || _result$recordsets4 === void 0 ? void 0 : _result$recordsets4[1]) || [],
              actividadMensual: ((_result$recordsets5 = result.recordsets) === null || _result$recordsets5 === void 0 ? void 0 : _result$recordsets5[2]) || [],
              clientes: ((_result$recordsets6 = result.recordsets) === null || _result$recordsets6 === void 0 ? void 0 : _result$recordsets6[3]) || [],
              ciudades: ((_result$recordsets7 = result.recordsets) === null || _result$recordsets7 === void 0 ? void 0 : _result$recordsets7[4]) || [],
              repuestos: ((_result$recordsets8 = result.recordsets) === null || _result$recordsets8 === void 0 ? void 0 : _result$recordsets8[5]) || [],
              ultimasReparaciones: ((_result$recordsets9 = result.recordsets) === null || _result$recordsets9 === void 0 ? void 0 : _result$recordsets9[6]) || [],
              tecnico: ((_result$recordsets10 = result.recordsets) === null || _result$recordsets10 === void 0 ? void 0 : (_result$recordsets10$ = _result$recordsets10[7]) === null || _result$recordsets10$ === void 0 ? void 0 : _result$recordsets10$[0]) || {}
            }
          }));
        case 13:
          _context22.prev = 13;
          _context22.t0 = _context22["catch"](0);
          console.error('Error consultando dashboard:', _context22.t0);
          return _context22.abrupt("return", res.status(500).json({
            status: 'error',
            msg: (_context22.t0 === null || _context22.t0 === void 0 ? void 0 : (_error$originalError8 = _context22.t0.originalError) === null || _error$originalError8 === void 0 ? void 0 : (_error$originalError9 = _error$originalError8.info) === null || _error$originalError9 === void 0 ? void 0 : _error$originalError9.message) || (_context22.t0 === null || _context22.t0 === void 0 ? void 0 : _context22.t0.message) || 'No se pudo obtener el dashboard.'
          }));
        case 17:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[0, 13]]);
  }));
  return function obtenerDashboardTecnico(_x43, _x44) {
    return _ref26.apply(this, arguments);
  };
}();
exports.obtenerDashboardTecnico = obtenerDashboardTecnico;