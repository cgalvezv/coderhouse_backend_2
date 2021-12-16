# Programación Backend - Coderhouse
# Proyecto Final
## Autor: _Camilo Gálvez Vidal_

## Entrega 1


### Features
- Servidor API REST creado con NPM y Express
- Implementa endpoints para la gestión de **productos** y del **carro de compras**.
- Se utilizan métodos, GET, POST, PUT, DELETE.
- Se agrega un middleware para el manejo de los usuarios con rol de **administradores**.
- Se agrega manejo de errores.

### Requisitos
Para el buen funcionamiento de este servidor, es **extrictamente** necesario tener en cuenta los siguientes puntos:

- Para agregar un producto nuevo, el objeto debe cumplir con la siguiente estructura:
```sh
{ 
    "titulo": "Escuadra",
    "descripcion": "De 30 cm",
    "codigo": "AB12345",
    "foto_url": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    "precio": 123.55,
    "stock": 20
}
```

- Este servidor utilizará como característica la recompilación automática cuando se detecte un cambio, utilizando el paquete `nodemon`. Por este motivo, es necesario que dicha dependencia este agregada en el archivo `package.json`. Si no se encontrara la dependencia, se puede instalar en el directorio local del repositorio, utilizando el comando `npm install nodemon --save`.

### Instalación y ejecución
Para la instalación, transpilación de los archivos que están en Javascript ES6 y próxima ejecución, se debe ejecutar los siguientes comandos :
```sh
cd coderhouse_backend_2
npm install
npm start
```

El servidor se ejecutará de manera local en el puerto `8080`.

### Listado de url's disponibles en la API

- **Productos**

```sh
http://localhost:8080/api/productos - GET [Obtiene el listado de productos]
http://localhost:8080/api/productos/:id - GET [Obtiene un producto en específico]
http://localhost:8080/api/productos - POST [Agrega un producto nuevo]
http://localhost:8080/api/productos/:id - PUT [Edita un producto en específico]
http://localhost:8080/api/productos/:id - DELETE [Elimina un producto en específico]
```

- **Carro de compras**

```sh
http://localhost:8080/api/carrito - POST [Crea un carrito nuevo]
http://localhost:8080/api/carrito/:id - DELETE [Elimina un carrito en específico]
http://localhost:8080/api/carrito/:id/productos - GET [Lista los productos de un carro en específico]
http://localhost:8080/api/carrito/:id/productos/:ids_productos - POST [Agrega un/os producto/s a un carro en específico]
http://localhost:8080/api/carrito/:id/productos/:id_producto - GET [Elimina un solo producto de un carro en específico]
```

### Listado de errores 

- Recurso no autorizado
```sh
{
    "error": -1,
    "descripcion": "ruta {nombre_ruta} metodo {nombre_metodo} no autorizada"
}
```

- Recurso no implementado
```sh
{
    "error": -2,
    "descripcion": "ruta {nombre_ruta} metodo {nombre_metodo} no implementada"
}
```

Ante cualquier duda acerca del desarrollo, puede tomar contacto con el autor utilizando los siguientes medios de comunicación:
[Email]: <camilogalvezv@gmail.com>
[Slack]: **@Camilo Gálvez**