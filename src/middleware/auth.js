//Método para manejar la utilización de un recurso, si este es utilizado por el administrador
const isAdmin = (req, res, next) => {
    //TODO: AGREGAR LÓGICA CUANDO SEA SOLICITADA
    next();
}

module.exports = {
    isAdmin
}