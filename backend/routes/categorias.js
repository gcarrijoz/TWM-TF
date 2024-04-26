
const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController.js');

// Rota para obter todas as categorias
router.get('/', categoriasController.getCategorias);


module.exports = router;
