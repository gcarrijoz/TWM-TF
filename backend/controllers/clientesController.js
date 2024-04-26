const Cliente = require('../models/Cliente');

let clientes = [
    new Cliente(1, 'João Gabriel', 'joao@gmail.com', '+5511987654321', '12345-678', 'Rua das Flores', 'Apto 101', 'São Paulo', 'SP', 'Seguro Auto Total'),
    new Cliente(2, 'Maria Antonia', 'maria@gmail.com', '+5514587654321', '54321-876', 'Avenida dos Girassóis', 'Casa', 'Rio de Janeiro', 'RJ', 'Seguro Auto Parcial'),
    new Cliente(3, 'Lucas Bernardes', 'lucas@gmail.com', '+5523332221234', '54223-876', 'Rua Florida', 'Casa', 'Araguari', 'MG', 'Seguro Residencial Premium'),
    new Cliente(4, 'Nicole Barbosa', 'nicole@gmail.com', '+555677768356', '65543-876', 'Rua Mágica', 'Casa', 'Uberlândia', 'MG', 'Seguro Residencial Parcial'),
    new Cliente(5, 'Marcelo Oliveira', 'marcelo@gmail.com', '+5556665557898', '43321-876', 'Avenida da Fortuna', 'Casa', 'Uberaba', 'MG', 'Seguro de Vida Familiar'),
    new Cliente(6, 'Ricardo Borges', 'ricardo@gmail.com', '+5589776554324', '43321-876', 'Avenida da Fortuna', 'Casa', 'Uberaba', 'MG', 'Seguro de Vida Familiar Total')
];

function getTodosClientes(req, res) {
    res.json(clientes);
}

function getClientePorId(req, res) {
    const clienteId = parseInt(req.params.id);
    const cliente = clientes.find(cliente => cliente.id === clienteId);
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({ message: 'Cliente não encontrado' });
    }
}



function adicionarCliente(req, res) {
    const { nome, email, whatsapp, cep, endereco, complemento, cidade, estado, produto } = req.body;
    const id = clientes.length + 1;

    const novoCliente = new Cliente(id, nome, email, whatsapp, cep, endereco, complemento, cidade, estado, produto);
    clientes.push(novoCliente);

    res.status(201).json(novoCliente);
}

function removerCliente(req, res) {
    const clienteId = parseInt(req.params.id);
    const index = clientes.findIndex(cliente => cliente.id === clienteId);
    if (index !== -1) {
        // Remove o cliente da lista
        clientes.splice(index, 1);
        res.json({ message: 'Cliente removido com sucesso' });

    } else {
        res.status(404).json({ message: 'Cliente não encontrado' });
    }
}

function editarCliente(req, res) {
    const clienteId = parseInt(req.params.id);
    const { nome, email, whatsapp, cep, endereco, complemento, cidade, estado, produto } = req.body;

    const index = clientes.findIndex(cliente => cliente.id === clienteId);
    if (index !== -1) {
        // Atualiza os dados do cliente
        clientes[index].nome = nome;
        clientes[index].email = email;
        clientes[index].whatsapp = whatsapp;
        clientes[index].cep = cep;
        clientes[index].endereco = endereco;
        clientes[index].complemento = complemento;
        clientes[index].cidade = cidade;
        clientes[index].estado = estado;
        clientes[index].produto = produto;

        res.json({ message: 'Cliente atualizado com sucesso', cliente: clientes[index] });
    } else {
        res.status(404).json({ message: 'Cliente não encontrado' });
    }
}

module.exports = { getTodosClientes, getClientePorId, adicionarCliente, removerCliente, editarCliente };
