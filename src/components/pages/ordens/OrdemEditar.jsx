import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../form/Input";
import SubmitButton from "../../form/SubmitButton";
import Container from "../../layout/Container";

import styles from '../PaginaCadastro.module.css';

function OrdemEditar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cliente: '',
        produto: '',
        tecnico: '',
        descricaoProblema: '',
        imagem: null,
        status: ''
    });

    const [clientes, setClientes] = useState([]);
    const [tecnicosPorCategoria, setTecnicosPorCategoria] = useState([]);

    useEffect(() => {
        async function fetchOrdem() {
            try {
                const response = await axios.get(`http://localhost:5000/ordens/${id}`);
                const ordem = response.data;
                setFormData(ordem);
            } catch (error) {
                console.error('Erro ao buscar ordem:', error);
            }
        }
        async function fetchClientes() {
            try {
                const response = await axios.get('http://localhost:5000/clientes');
                setClientes(response.data);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        }

        async function fetchTecnicos() {
            try {
                const response = await axios.get('http://localhost:5000/tecnicos');
                const tecnicos = response.data;
                setTecnicosPorCategoria(tecnicos);
            } catch (error) {
                console.error("Erro ao buscar tecnicos:", error);
            }
        }
        fetchOrdem();
        fetchClientes();
        fetchTecnicos();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'imagem' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/ordens/${id}`, formData);
            alert("Ordem editada com sucesso!");
            navigate('/ordens');
        } catch (error) {
            console.error("Erro ao editar ordem:", error);            
        }
    };

    return (
        <section>
            <Container customClass="column">
                <h1>Edição de ordem de serviço</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.div_categoria}>
                        <label htmlFor="cliente">Cliente:</label>
                        <select id="cliente" name="cliente" value={formData.cliente} onChange={handleChange} required disabled>
                            <option value="">Selecione o cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                            ))}
                        </select>
                    </div>
                    <Input label="Produto" type="text" name="produto" value={formData.produto} onChange={handleChange} required readOnly/>
                    <div className={styles.div_categoria}>
                        <label htmlFor="tecnico">Técnico:</label>
                        <select id="tecnico" name="tecnico" value={formData.tecnico} onChange={handleChange} required disabled>
                            <option value="">Selecione o técnico</option>
                            {/* Mapear os técnicos filtrados por categoria */}
                            {tecnicosPorCategoria.map(tecnico => (
                                <option key={tecnico.id} value={tecnico.id}>{tecnico.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.div_descricao}>                    
                        <label htmlFor="descricaoProblema">Descrição do Problema:</label>
                        <textarea id="descricaoProblema" name="descricaoProblema" rows="4" cols="50" value={formData.descricaoProblema} onChange={handleChange} placeholder="Descreva o problema" required></textarea>
                    </div>
                    <Input label="Imagem" type="file" name="imagem" onChange={handleChange} />
                    <div className={styles.div_categoria}>
                        <label htmlFor="status">Status:</label>
                        <select id="status" name="status" value={formData.status} onChange={handleChange}>
                            <option value="Aberta">Aberta</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="Concluida">Concluída</option>
                        </select>
                    </div>

                    <SubmitButton text="EDITAR" />
                </form>
            </Container>
        </section>
    )
}

export default OrdemEditar;
