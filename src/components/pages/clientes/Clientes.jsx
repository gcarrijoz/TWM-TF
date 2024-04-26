import { useEffect, useState } from 'react';
import axios from 'axios';


import Container from "../../layout/Container"
import ItemLista from "../../layout/ItemLista"
import LinkButton from "../../layout/LinkButton"

function Clientes(){

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        async function fetchClientes() {
            try {
                const response = await axios.get('http://localhost:5000/clientes');
                setClientes(response.data);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        }

        fetchClientes();
    }, []); 

    const handleExcluirCliente = async (clienteId) => {
        try {
            await axios.delete(`http://localhost:5000/clientes/${clienteId}`);
            // Atualizar a lista de clientes após a exclusão
            const response = await axios.get('http://localhost:5000/clientes');
            setClientes(response.data);
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        }
    };

    return(
        <section>
            <Container customClass="column">
            <h1>Clientes</h1>
            <LinkButton tipo="box_btn" destino="/cadastro-cliente" text="NOVO CLIENTE"/>
            {clientes.map((cliente) => (
                    <ItemLista id={cliente.id} nome={cliente.nome} produto={cliente.produto} onExcluir={handleExcluirCliente} destinoEditar={`/editar-cliente/${cliente.id}`}/>
                ))}
            
            </Container>
        </section>
    )
}

export default Clientes