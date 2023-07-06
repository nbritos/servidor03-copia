"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = __importDefault(require("../models/productModel"));
class ProductController {
    //CRUD	
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.header("Authorization")); //Observamos el valor del token
            //res.send('Listado de usuarios!!!');
            console.log(req.body);
            const productos = yield productModel_1.default.listar();
            console.log(productos);
            return res.json(productos);
            //res.send('Listado de usuarios!!!');
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body); //Body lleva los datos de la peticion POST
            //res.send('Usuario agregado!!!');
            const productos = req.body;
            console.log(req.body);
            //res.send('Usuario agregado!!!');
            const busqueda = yield productModel_1.default.buscarNombre((String)(productos.descripcion));
            if (!busqueda) {
                const result = yield productModel_1.default.crear(productos);
                return res.json({ mensaje: 'product saved!!' });
            }
            return res.json({ mensaje: 'product exists!!' });
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            console.log(req.params.id);
            const { id } = req.params;
            const producto = yield productModel_1.default.buscarId(id);
            if (producto)
                return res.json(producto);
            res.status(404).json({ text: "product doesn't exists" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Actualizando ", req.params.id, " ", req.body);
            console.log(req.body);
            const { id } = req.params;
            const result = yield productModel_1.default.actualizar(req.body, id);
            return res.json({ text: 'updating a product ' + id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            console.log(req.body);
            const { id } = req.params;
            const result = yield productModel_1.default.eliminar(id);
            return res.json({ text: 'deleting a product ' + id });
        });
    }
}
//Instanciamos el objeto controlador y lo exportamos
const productController = new ProductController();
exports.default = productController;
//# sourceMappingURL=productController.js.map