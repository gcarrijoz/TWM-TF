const Categoria = require('../models/Categoria.js');

let categorias = [
    new Categoria(1, 'Automóvel'),
    new Categoria(2, 'Residêncial'),
    new Categoria(3, 'Vida'),
];

function getCategorias(req, res) {
    res.json(categorias);
}

module.exports = { getCategorias };



