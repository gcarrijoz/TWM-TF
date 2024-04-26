
class Cliente {
    constructor(id, nome, email, whatsapp, cep, endereco, complemento, cidade, estado, produto) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.whatsapp = whatsapp;
        this.cep = cep;
        this.endereco = endereco;
        this.complemento = complemento;
        this.cidade = cidade;
        this.estado = estado;
        this.produto = produto;
    }
}

module.exports = Cliente;
