const Ordem = require('../models/Ordem.js');

let ordens = []; // Array para armazenar as ordens de serviço

// Função para obter todas as ordens de serviço
function getTodasOrdens(req, res) {
    res.json(ordens);
}

// Função para adicionar uma nova ordem de serviço
function adicionarOrdem(req, res) {
    const { cliente, produto, tecnico, descricaoProblema, imagem, status } = req.body;
    const id = ordens.length + 1;

    const novaOrdem = new Ordem(id, cliente, produto, tecnico, descricaoProblema, imagem, status);
    ordens.push(novaOrdem);

    res.status(201).json(novaOrdem);
}

// Função para excluir uma ordem de serviço
function excluirOrdem(req, res) {
    const ordemId = parseInt(req.params.id);
    const index = ordens.findIndex(ordem => ordem.id === ordemId);
    if (index !== -1) {
        // Remove a ordem de serviço da lista
        ordens.splice(index, 1);
        res.json({ message: 'Ordem de serviço removida com sucesso' });
    } else {
        res.status(404).json({ message: 'Ordem de serviço não encontrada' });
    }
}

// Funcao para editar Ordem
function editarOrdem(req, res) {
    const ordemId = parseInt(req.params.id);
    const { cliente, produto, tecnico, descricaoProblema, imagem, status } = req.body;

    const index = ordens.findIndex(ordem => ordem.id === ordemId);
    if (index !== -1) {
        // Atualiza os dados da ordem de serviço
        ordens[index].cliente = cliente;
        ordens[index].produto = produto;
        ordens[index].tecnico = tecnico;
        ordens[index].descricaoProblema = descricaoProblema;
        ordens[index].imagem = imagem;
        ordens[index].status = status;

        res.json({ message: 'Ordem de serviço atualizada com sucesso', ordem: ordens[index] });
    } else {
        res.status(404).json({ message: 'Ordem de serviço não encontrada' });
    }
}


// Função para obter todas as ordens de serviço vinculadas a um técnico específico
function getOrdensPorTecnico(req, res) {
    const tecnicoId = parseInt(req.params.tecnicoId); // Obtém o ID do técnico da URL
    const ordensDoTecnico = ordens.filter(ordem => ordem.tecnico == tecnicoId);
    
    // Verifica se há ordens vinculadas ao técnico
    if (ordensDoTecnico.length > 0) {
        res.json(ordensDoTecnico); // Retorna as ordens vinculadas ao técnico
    } else {
        res.status(404).json({ message: 'Nenhuma ordem de serviço encontrada para este técnico' });
    }
}

// Função para obter uma ordem de serviço pelo ID
function getOrdemPorId(req, res) {
    const ordemId = parseInt(req.params.id);
    const ordem = ordens.find(ordem => ordem.id === ordemId);
    if (ordem) {
        res.json(ordem);
    } else {
        res.status(404).json({ message: 'Ordem de serviço não encontrada' });
    }
}



module.exports = { getTodasOrdens, adicionarOrdem, excluirOrdem, getOrdensPorTecnico, getOrdemPorId, editarOrdem };
