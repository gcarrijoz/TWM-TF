const Produto = require('../models/Produto');

let produtos = [
    new Produto(1, 'Seguro Auto Total', 'Seguro abrangente para proteção veicular, cobrindo danos por colisão, incêndio, roubo, danos elétricos, entre outros.', 'Automóvel', 99.90, 1200),
    new Produto(2, 'Seguro Auto Parcial', 'Seguro apenas para danos por colisão', 'Automóvel', 50, 700),
    new Produto(3, 'Seguro Residencial Premium', 'Seguro completo para proteção residencial, cobrindo danos por incêndio, roubo, danos elétricos, entre outros.', 'Residêncial', 79.90, 2400),
    new Produto(4, 'Seguro Residencial Parcial', 'Seguro apenas contra danos por incêncio', 'Residêncial', 20, 1000),
    new Produto(5, 'Seguro de Vida Familiar', 'Seguro de vida abrangente para proteger financeiramente a família em caso de falecimento do segurado, oferecendo indenização para os beneficiários.', 'Vida', 50, 0),
    new Produto(6, 'Seguro de Vida Familiar Total', 'Seguro de vida abrangente para proteger financeiramente a família em caso de falecimento de qualquer familiar, oferecendo indenização para os beneficiários.', 'Vida', 90, 0)
    
];

function getTodosProdutos(req, res) {
    res.json(produtos);
}

function getProdutoPorId(req, res) {
    const produtoId = parseInt(req.params.id);
    const produto = produtos.find(produto => produto.id === produtoId);
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
}

function adicionarProduto(req, res) {
    const { nome, descricao, categoria, mensalidade, franquia } = req.body;
    const id = produtos.length + 1;

    const novoProduto = new Produto(id, nome, descricao, categoria, mensalidade, franquia);
    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
}

function removerProduto(req, res) {
    const produtoId = parseInt(req.params.id);
    const index = produtos.findIndex(produto => produto.id === produtoId);
    if (index !== -1) {
        // Remove o produto da lista
        produtos.splice(index, 1);
        res.json({ message: 'Produto removido com sucesso' });

    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
}

function editarProduto(req, res) {
    const produtoId = parseInt(req.params.id);
    const { nome, descricao, categoria, mensalidade, franquia} = req.body;

    const index = produtos.findIndex(produto => produto.id === produtoId);
    if (index !== -1) {
        // Atualiza os dados do produto
        produtos[index].nome = nome;
        produtos[index].descricao = descricao;
        produtos[index].categoria = categoria;
        produtos[index].mensalidade = mensalidade;
        produtos[index].franquia = franquia;

        res.json({ message: 'Produto atualizado com sucesso', produto: produtos[index] });
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
}

module.exports = { getTodosProdutos, getProdutoPorId, adicionarProduto, removerProduto, editarProduto};