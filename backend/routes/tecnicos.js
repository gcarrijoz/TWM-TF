const express = require('express');
const router = express.Router();
const tecnicosController = require('../controllers/tecnicosController');

// Rota para obter todos os técnicos
router.get('/', tecnicosController.getTodosTecnicos);

// Rota para obter um tecnico específico pelo ID
router.get('/:id', tecnicosController.getTecnicoPorId);

// Rota para adicionar um novo técnico
router.post('/', tecnicosController.adicionarTecnico);

// Rota para remover um tecnico específico pelo ID
router.delete('/:id', tecnicosController.removerTecnico);

// Rota para editar um tecnico específico pelo ID
router.put('/:id', tecnicosController.editarTecnico);

module.exports = router;
