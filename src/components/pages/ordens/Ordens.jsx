import { useEffect, useState } from 'react';
import axios from 'axios';

import Container from "../../layout/Container"
import LinkButton from "../../layout/LinkButton"
import ItemLista from "../../layout/ItemLista"

function Ordens(){

    const [ordens, setOrdens] = useState([]);

    useEffect(() => {
        async function fetchOrdens() {
            try {
                const response = await axios.get('http://localhost:5000/ordens');
                const ordersWithNames = await Promise.all(response.data.map(async (order) => {
                    const clienteResponse = await axios.get(`http://localhost:5000/clientes/${order.cliente}`);
                    const tecnicoResponse = await axios.get(`http://localhost:5000/tecnicos/${order.tecnico}`);
                    return {
                        ...order,
                        cliente: clienteResponse.data.nome,
                        tecnico: tecnicoResponse.data.nome
                    };
                }));
                setOrdens(ordersWithNames);
            } catch (error) {
                console.error('Erro ao buscar ordens:', error);
            }
        }

        fetchOrdens();
    }, []); 

    const handleExcluirOrdem = async (ordemId) => {
        try {
            await axios.delete(`http://localhost:5000/ordens/${ordemId}`);
            const response = await axios.get('http://localhost:5000/ordens');
            setOrdens(response.data);
        } catch (error) {
            console.error('Erro ao excluir ordem:', error);
        }
    };

    return(
        <section>
            <Container customClass='column'>
                <h1>Ordens de Serviço</h1>
                <LinkButton tipo="box_btn" destino="/cadastro-ordem" text="NOVA ORDEM"/>
                {ordens.map((ordem) => (
                    <ItemLista 
                        id={ordem.id} 
                        nome={ordem.cliente} 
                        tecnico={ordem.tecnico} 
                        status={ordem.status}  
                        onExcluir={handleExcluirOrdem} 
                        destinoEditar={`/editar-ordem/${ordem.id}`}
                    />
                ))}
            </Container>            
        </section>
    )
}

export default Ordens
