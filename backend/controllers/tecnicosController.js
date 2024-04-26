// controllers/tecnicosController.js
const Tecnico = require('../models/Tecnico');

let tecnicos = [
    new Tecnico(1, 'Gabriel Carrijo', 'gabriel@gmail.com', '(34) 99322-7343', 'Residêncial'),
    new Tecnico(2, 'João Santos', 'joao@gmail.com', '(34) 99120-1080', 'Vida'),
    new Tecnico(3, 'Lucas Marques', 'lucas@gmail.com', '(34) 98870-3029', 'Automóvel'),
    new Tecnico(4, 'Pedro Silva', 'pedro@gmail.com', '(34) 99754-7343', 'Residêncial'),
    new Tecnico(5, 'Joaquim Siveira', 'joaquim@gmail.com', '(34) 98886-1080', 'Vida'),
    new Tecnico(6, 'Felipe Santos', 'felipe@gmail.com', '(34) 97754-3029', 'Automóvel'),
];

function getTodosTecnicos(req, res) {
    res.json(tecnicos);
}

function getTecnicoPorId(req, res) {
    const tecnicoId = parseInt(req.params.id);
    const tecnico = tecnicos.find(tecnico => tecnico.id === tecnicoId);
    if (tecnico) {
        res.json(tecnico);
    } else {
        res.status(404).json({ message: 'Tecnico não encontrado' });
    }
}

function adicionarTecnico(req, res) {
    const { nome, email, whatsapp, categoria } = req.body;
    const id = tecnicos.length + 1;

    const novoTecnico = new Tecnico(id, nome, email, whatsapp, categoria);
    tecnicos.push(novoTecnico);

    res.status(201).json(novoTecnico);
}

function removerTecnico(req, res) {
    const tecnicoId = parseInt(req.params.id);
    const index = tecnicos.findIndex(tecnico => tecnico.id === tecnicoId);
    if (index !== -1) {
        // Remove o tecnico da lista
        tecnicos.splice(index, 1);
        res.json({ message: 'Tecnico removido com sucesso' });

    } else {
        res.status(404).json({ message: 'Tecnico não encontrado' });
    }
}

function editarTecnico(req, res) {
    const tecnicoId = parseInt(req.params.id);
    const { nome, email, whatsapp, categoria} = req.body;

    const index = tecnicos.findIndex(tecnico => tecnico.id === tecnicoId);
    if (index !== -1) {
        // Atualiza os dados do tecnico
        tecnicos[index].nome = nome;
        tecnicos[index].email = email;
        tecnicos[index].whatsapp = whatsapp;
        tecnicos[index].categoria = categoria;

        res.json({ message: 'Tecnico atualizado com sucesso', tecnico: tecnicos[index] });
    } else {
        res.status(404).json({ message: 'Tecnico não encontrado' });
    }
}

module.exports = { getTodosTecnicos, getTecnicoPorId, adicionarTecnico, editarTecnico, removerTecnico};
