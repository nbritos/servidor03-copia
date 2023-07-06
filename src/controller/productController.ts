import { Request, Response } from 'express';
import { IProduct } from 'models/productoModel';
import jwt from 'jsonwebtoken';
import productModel from '../models/productModel';

class ProductController {

    //CRUD	
    public async list(req: Request, res: Response) {
        console.log(req.header("Authorization"));//Observamos el valor del token
        //res.send('Listado de usuarios!!!');
        console.log(req.body);
        const productos: IProduct[] = await productModel.listar();
        console.log(productos);
        return res.json(productos);
        //res.send('Listado de usuarios!!!');
    }

    public async addProduct(req: Request, res: Response) {
        console.log(req.body);//Body lleva los datos de la peticion POST
        //res.send('Usuario agregado!!!');
        const productos: IProduct = req.body;
        console.log(req.body);
        //res.send('Usuario agregado!!!');
        const busqueda = await productModel.buscarNombre((String)(productos.descripcion));
        if (!busqueda) {
            const result = await productModel.crear(productos);
            return res.json({ mensaje: 'product saved!!' });
        }
        return res.json({ mensaje: 'product exists!!' });
    }

    public async find(req: Request, res: Response) {
        console.log(req.params.id); 
        console.log(req.params.id);
        const { id } = req.params;
        const producto = await productModel.buscarId(id);
        if (producto)
            return res.json(producto);
        res.status(404).json({ text: "product doesn't exists" });
    }

    public async update(req: Request, res: Response) {//params lleva los datos que se pasan por URL o URI
        console.log("Actualizando ", req.params.id, " ", req.body);
        console.log(req.body);
        const { id } = req.params;
        const result = await productModel.actualizar(req.body, id);
        return res.json({ text: 'updating a product ' + id });
    }

    public async delete(req: Request, res: Response) {//params lleva los datos que se pasan por URL o URI
       
        console.log(req.params.id);
        console.log(req.body);
        const { id } = req.params; 
        const result = await productModel.eliminar(id);
        return res.json({ text: 'deleting a product ' + id });
    }

    //FIN CRUD
    // public async login(req: Request, res: Response) {
    //     console.log("Datos: ", req.body); //podemos pasar objetos separados por comas para inmprimir.
    //     //res.send('Datos recibidos!!!');//Si los concatemamos console.log los toma como un solo objeto.
    //     console.log("Usuario: ", req.body.usuario);
    //     console.log("Password: ", req.body.password);
    //     /*if (req.body.usuario == "Pepe" && req.body.password == "123456")
    //         res.json({ "login": "ok", "mensaje": "Bienvenido!!" });
    //     else//Falta enviar el resultado estilizado a traves de una vista
    //         res.status(403).json({ "login": "incorrecto", "mensaje": "Usuario y/o contraseña incorrectos!!" });*/
    //     const { nombre, password } = req.body; /* hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.*/
    //     const result: Usuario = await userModel.buscarNombre(nombre);
    //     console.log(nombre);
    //     console.log(password);
    //     console.log(result);
    //     if (result != null) {
    //         if (result.nombre == nombre && result.password == password) {
    //             const token:string=jwt.sign({_id: result.id},"secretKey");
    //             res.json({ "login":"ok","mensaje":"Bienvenido "+result.nombre,token:token});
    //             return;
    //         }
    //     }
    //     res.json({ "login": "incorrecto", "mensaje": "Usuario y/o contraseña incorrectos!!" });

    // }

}

//Instanciamos el objeto controlador y lo exportamos
const productController = new ProductController();
export default productController;
