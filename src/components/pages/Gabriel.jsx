import { useEffect, useState } from 'react';
import axios from 'axios';

import Container from "../layout/Container"
import ItemLista from "../layout/ItemLista"

function Gabriel(){
    const [ordens, setOrdens] = useState([]);

    useEffect(() => {
        async function fetchOrdens() {
            try {
                const response = await axios.get('http://localhost:5000/ordens/tecnico/1');
                const ordersWithNames = await Promise.all(response.data.map(async (order) => {
                    const clienteResponse = await axios.get(`http://localhost:5000/clientes/${order.cliente}`);
                    return {
                        ...order,
                        cliente: clienteResponse.data.nome,
                    };
                }));
                setOrdens(ordersWithNames);
            } catch (error) {
                console.error('Erro ao buscar ordens:', error);
            }
        }

        fetchOrdens();
    }, []);

    return(
        <section>
            <Container customClass="column">
                <h1>Ordens - Gabriel Carrijo</h1>
                {ordens.map((ordem) => (
                    <ItemLista 
                        id={ordem.id} 
                        nome={ordem.cliente} 
                        produto={ordem.produto} 
                        status={ordem.status}
                        semBtn
                        editarOrdem
                        destinoEditar={`/editar-ordem/${ordem.id}`}
                    />
                ))}
            </Container>
        </section>
    )
}


export default Gabriel