const Archivo = require('../database/archivo');
const CarroItem = require('./carroItem');

class Carro {
    constructor() {
        this.fileCarro = new Archivo(require('path').resolve(__dirname, '../database/carro.txt'));
        this.fileProductos = new Archivo(require('path').resolve(__dirname, '../database/productos.txt'));
    }
    
    /***
     * Método que inicializa la clase, trayendo la info desde el archivo utilizado para persisitir 
     */
    async init() {
        this.list = await this.fileCarro.leer();
        this.products = await this.fileProductos.leer();
        this.currentId = this.list.length + 1;
    }

    /**
     * Método agrega un nuevo item de carrito a la lista
     */
    add() {
        const newCarro = new CarroItem(this.currentId)
        this.list.push(newCarro);
        this.currentId++;
        this.fileCarro.reiniciar(this.list)
        return newCarro.id;
    }

    /**
    * Método que elimina un item de carrito
    * @param {number} id es el ID del item de carrito a eliminar
    * @returns el item de carrito eliminado
    */
    delete(id) {
        const idxCartToDelete = this.list.findIndex(cart => cart.id == id);
        if (idxCartToDelete < 0) return { error: -1, codigo: 400, descripcion: 'Carro no encontrado' }
        const response = this.list.splice(idxCartToDelete, 1)[0];
        this.fileCarro.reiniciar(this.list)
        return response;
    }

    /**
     * Método que obtiene todos los los productos, en base a un id de carrito dado
     * @param {number} id 
     * @returns la lista de todos los productos de un carro en específico
     */
    getProducts(id) {
        if(!id) return { error: -1, codigo: 500, descripcion: 'ID del carro no válido' };
        if (this.list.length <= 0) return { error: -1, codigo: 400, descripcion: 'No hay carro de compras cargados' }
        const cartFinded = this.list.find(cart => cart.id == id);
        if (!cartFinded) return { error: -1, codigo: 400, descripcion: 'Carro de compras no existente' }
        return cartFinded.productos;
    }

    /**
     * Método para agregar varios productos a un carro en específico
     * @param {number} id es el identificador del carrito
     * @param {Array(Number)} ids_productos es la lista de los id's de productos a agregar
     * @returns El carrito con los productos agregados
     */
    addProducts(id, ids_productos) {
        if(!id) return { error: -1, codigo: 500, descripcion: 'ID del carro no válido' };
        const cart = this.list.find(cart => cart.id == id);
        if (!cart) return { error: -1, codigo: 400, descripcion: 'Carro de compras no existente' }
        const productsToAdd = ids_productos.map(id_producto => this.products.find(product => product.id == id_producto)).filter(product => product);
        this.list.find(cart => cart.id == id).productos = [...cart.productos, ...productsToAdd]
        this.fileCarro.reiniciar(this.list)
        return cart;
    }

    /**
     * Método para eliminar un solo producto de un carrito dado
     * @param {number} id es el identificador del carrito
     * @param {number} id_producto es el identificador del producto que se desea eliminar
     * @returns el producto eliminado del carro 
     */
    deleteProduct(id, id_producto) {
        if(!id) return { error: -1, codigo: 500, descripcion: 'ID del carro no válido' };
        const cart = this.list.find(cart => cart.id == id);
        if (!cart) return { error: -1, codigo: 400, descripcion: 'Carro de compras no existente' }
        const idxProductToDelete = this.list.find(cart => cart.id == id).productos.findIndex(product => product.id == id_producto);
        const response = this.list.find(cart => cart.id == id).productos.splice(idxProductToDelete, 1)[0];
        this.fileCarro.reiniciar(this.list)
        return response;
    }
}

// exporto una instancia de la clase
module.exports = new Carro();