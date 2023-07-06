import { Router, Request, Response } from 'express';
import {TokenValidation} from "../lib/verifyToken";
import productController from '../controller/productController';

class ProductRoutes {
    //Instanciamos el enrutador.
    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config(): void {
        this.router.get('/', (req: Request, res: Response) => {
            res.send('Main product!!!');
        });
        
        this.router.get('/list',productController.list);
        this.router.post('/add', productController.addProduct);
        this.router.get('/find/:id', productController.find);
        this.router.put('/update/:id', productController.update);
        this.router.delete('/delete/:id', productController.delete);
    }
}

//Exportamos el enrutador del objeto usuarios con 

const productRoutes = new ProductRoutes();
export default productRoutes.router;
