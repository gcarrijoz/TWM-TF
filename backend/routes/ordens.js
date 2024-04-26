const express = require('express');
const router = express.Router();
const ordensController = require('../controllers/ordensController');

// Rota para obter todas as ordens
router.get('/', ordensController.getTodasOrdens);

// Rota para obter ordem por id
router.get('/:id', ordensController.getOrdemPorId);

// Rota para adicionar uma nova ordem
router.post('/', ordensController.adicionarOrdem);

// Rota para excluir uma ordem
router.delete('/:id', ordensController.excluirOrdem)

// Define a rota para obter ordens por técnico
router.get('/tecnico/:tecnicoId', ordensController.getOrdensPorTecnico);

// Rota para editar um ordem específica pelo ID
router.put('/:id', ordensController.editarOrdem);

module.exports = router;