class CarroItem {
    constructor(id) {
        this.id = id;
        this.productos = [];
        this.timestamp = Date.now();
    }
}

module.exports = CarroItem;