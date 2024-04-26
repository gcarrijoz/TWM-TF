import { useEffect, useState } from 'react';
import axios from 'axios';

import Container from "../../layout/Container"
import ItemLista from "../../layout/ItemLista"
import LinkButton from "../../layout/LinkButton"

function Produtos(){

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await axios.get('http://localhost:5000/produtos');
                setProdutos(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        }

        fetchProdutos();
    }, []); 

    const handleExcluirProduto = async (produtoId) => {
        try {
            await axios.delete(`http://localhost:5000/produtos/${produtoId}`);
            // Atualizar a lista de produtos após a exclusão
            const response = await axios.get('http://localhost:5000/produtos');
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    };


    return(
        <section>
            <Container customClass="column">
                <h1>Produtos</h1>
                <LinkButton tipo="box_btn" destino="/cadastro-produto" text="NOVO PRODUTO"/>
                {produtos.map((produto) => (
                    <ItemLista id={produto.id} nome={produto.nome} categoria={produto.categoria} onExcluir={handleExcluirProduto} destinoEditar={`/editar-produto/${produto.id}`}/>
                ))}

            </Container>
        </section>
    )
}

export default Produtos