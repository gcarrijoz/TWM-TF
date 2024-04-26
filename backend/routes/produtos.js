const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

// Rota para obter todos os produtos
router.get('/', produtosController.getTodosProdutos);

// Rota para obter um produto específico pelo ID
router.get('/:id', produtosController.getProdutoPorId);

// Rota para adicionar um novo produto
router.post('/', produtosController.adicionarProduto);

// Rota para remover um produto específico pelo ID
router.delete('/:id', produtosController.removerProduto);

// Rota para editar um produto específico pelo ID
router.put('/:id', produtosController.editarProduto);


module.exports = router;