class Ordem {
    constructor(id, cliente, produto, tecnico, descricaoProblema, imagem, status) {
        this.id = id;
        this.cliente = cliente;
        this.produto = produto;
        this.tecnico = tecnico;
        this.descricaoProblema = descricaoProblema;
        this.imagem = imagem;
        this.status = status;
    }
}

module.exports = Ordem;
