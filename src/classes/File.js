const fs = require('fs');

/**
 * Método que convierte un string recibido de la lectura de archivo a Array, eliminando todos los \n y \t existentes
 * @param {string} fileString es el string obtenido de la lectura de archivo
 * @returns el string recibido convertido en formato array
 */
const fileStringToArray = fileString => JSON.parse(fileString.replace(/(?:\n\t|\n|\t)/g,''));

class File {
    constructor(filename) {
        this.filename = filename;
    }

    async getAll() {
        try {
            const objects = await fs.promises.readFile(this.filename, 'utf-8')
            return fileStringToArray(objects.toString());
        } catch {
            console.log([]);
            return [];
        }   
    }

    async getRandom() {
        try {
            const objects = await fs.promises.readFile(this.filename, 'utf-8')
            const objectsJSON = fileStringToArray(objects.toString())
            return objectsJSON[Math.floor(Math.random()*objectsJSON.length)];
        } catch {
            console.log([]);
            return [];
        }   
    }

    async getByID(id) {
        try {
            const objects = await fs.promises.readFile(this.filename, 'utf-8')
            const objectsJson = fileStringToArray(objects.toString());
            return objectsJson.find(object => object.id === id) || [];
        } catch {
            console.log([]);
            return [];
        }   
    }

    async save(object) {
        try {
            const objects = await fs.promises.readFile(this.filename, 'utf-8')
            const objectsArray = fileStringToArray(objects)
            object.id = objectsArray.length + 1;
            objectsArray.push(object)
            await fs.promises.writeFile(this.filename, JSON.stringify(objectsArray, null, '\t'))
        } catch (error) {
            console.error(error);
        }  
    }

    async deleteByID(id) {
        try {
            const objects = await fs.promises.readFile(this.filename, 'utf-8')
            const objectsJson = fileStringToArray(objects.toString());
            await fs.promises.writeFile(this.filename, JSON.stringify(objectsJson.filter(object => object.id !== id) || [], null, '\t'))
        } catch {
            console.log([]);
            return [];
        } 
    }

    async deleteAll() {
        fs.unlink(this.filename, error => {
            if (error) {
                console.error(error);
            } else {
                console.log(`Archivo ${this.filename} eliminado`)
            }
        })
    }
}

module.exports = File;