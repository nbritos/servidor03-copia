import { createPool } from 'mysql2/promise';
import { IProduct } from './productoModel';

class ProductModel {
	private db: any; //Manejador de la bd
	constructor() {
		this.config(); //aplicamos la conexion con la BD.
	}

	async config() {//Parametro de conexion con la BD.
		this.db = await createPool({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'pedidost1',
			connectionLimit: 10
		});
	}
	/* Nota: Aqui cada uno tiene que setear los parametros de su propio servidor MySQL / MariaDB.*/
	
	async listar() {
		const productos = await this.db.query('SELECT * FROM articulost1');
	
		return productos[0];
	}

	//Devuelve un objeto cuya fila en la tabla usuarios coincide con id.
	//Si no la encuentra devuelve null
	async buscarId(id: string) {
		const encontrado: any = await this.db.query('SELECT * FROM articulost1 WHERE id = ?', [id]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	async buscarNombre(descripcion: string) {
		const encontrado: any = await this.db.query('SELECT * FROM articulost1 WHERE descripcion = ?', [descripcion]);
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	//Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
	async crear(producto: IProduct) {
		const result = (await this.db.query('INSERT INTO articulost1 SET ?', [producto]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro actualizar el usuario indicado por id
	async actualizar(producto: IProduct, id: string) {
		const result = (await this.db.query('UPDATE articulost1 SET ? WHERE ID = ?', [producto, id]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro eliminar el usuario indicado por id
	async eliminar(id: string) {
		const user = (await this.db.query('DELETE FROM articulost1 WHERE ID = ?', [id]))[0].affectedRows;
		console.log(user);
		return user;
	}

}

//Exportamos el objeto userModel con 

const productModel: ProductModel = new ProductModel();
export default productModel;
