import { useEffect, useState } from 'react';
import axios from 'axios';

import ItemLista from "../../layout/ItemLista"
import Container from "../../layout/Container"
import LinkButton from "../../layout/LinkButton"

function Tecnicos(){
    const [tecnicos, setTecnicos] = useState([]);

    useEffect(() => {
        async function fetchTecnicos() {
            try {
                const response = await axios.get('http://localhost:5000/tecnicos');
                setTecnicos(response.data);
            } catch (error) {
                console.error('Erro ao buscar tecnicos:', error);
            }
        }

        fetchTecnicos();
    }, []); 

    const handleExcluirTecnico = async (tecnicoId) => {
        try {
            await axios.delete(`http://localhost:5000/tecnicos/${tecnicoId}`);
            // Atualizar a lista de tecnicos após a exclusão
            const response = await axios.get('http://localhost:5000/tecnicos');
            setTecnicos(response.data);
        } catch (error) {
            console.error('Erro ao excluir tecnico:', error);
        }
    };


    return(
        <section>            
            <Container customClass="column">
                <h1>Técnicos</h1>            
                <LinkButton tipo="box_btn" destino="/cadastro-tecnico" text="NOVO TÉCNICO"/>
                {tecnicos.map((tecnico) => (
                    <ItemLista id={tecnico.id} nome={tecnico.nome} categoria={tecnico.categoria} onExcluir={handleExcluirTecnico} destinoEditar={`/editar-tecnico/${tecnico.id}`}/>
                ))}
            </Container>
        </section>
    )
}

export default Tecnicos