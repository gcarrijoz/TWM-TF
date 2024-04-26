
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rota para obter todos os clientes
router.get('/', clientesController.getTodosClientes);

// Rota para obter um cliente específico pelo ID
router.get('/:id', clientesController.getClientePorId);

// Rota para adicionar um novo cliente
router.post('/', clientesController.adicionarCliente);

// Rota para remover um cliente específico pelo ID
router.delete('/:id', clientesController.removerCliente);

// Rota para editar um cliente específico pelo ID
router.put('/:id', clientesController.editarCliente);



module.exports = router;
