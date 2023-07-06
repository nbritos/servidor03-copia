"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controller/productController"));
class ProductRoutes {
    constructor() {
        //Instanciamos el enrutador.
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Main product!!!');
        });
        this.router.get('/list', productController_1.default.list);
        this.router.post('/add', productController_1.default.addProduct);
        this.router.get('/find/:id', productController_1.default.find);
        this.router.put('/update/:id', productController_1.default.update);
        this.router.delete('/delete/:id', productController_1.default.delete);
    }
}
//Exportamos el enrutador del objeto usuarios con 
const productRoutes = new ProductRoutes();
exports.default = productRoutes.router;
//# sourceMappingURL=productRoutes.js.map