import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Input from "../../form/Input";
import SubmitButton from "../../form/SubmitButton";
import Container from "../../layout/Container";

import styles from '../PaginaCadastro.module.css';

function OrdemCadastro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cliente: '',
        produto: '',
        tecnico: '',
        descricaoProblema: '',
        imagem: null, 
        status: 'Aberta' 
    });

    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const [tecnicosPorCategoria, setTecnicosPorCategoria] = useState([]);

    useEffect(() => {
        async function fetchClientes() {
            try {
                const response = await axios.get('http://localhost:5000/clientes');
                setClientes(response.data);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        }
    
        async function fetchProdutos() {
            try {
                const response = await axios.get('http://localhost:5000/produtos');
                setProdutos(response.data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        }
    
        async function fetchTecnicos() {
            try {
                const response = await axios.get('http://localhost:5000/tecnicos');
                setTecnicos(response.data);
            } catch (error) {
                console.error("Erro ao buscar tecnicos:", error);
            }
        }
    
        fetchClientes();
        fetchProdutos();
        fetchTecnicos();
    
    }, []);
    
    
    const getProdutoCategoria = (produtoNome) => {
        const produtoSelecionado = produtos.find(produto => produto.nome === produtoNome);
        return produtoSelecionado ? produtoSelecionado.categoria : '';
    };

    const getTecnicosPorCategoria = (categoria) => {
        return tecnicos.filter(tecnico => tecnico.categoria === categoria);
    };


    const handleChange = async (e) => {
        const { name, value, files } = e.target;
        const clienteId = parseInt(value);
        if (name === 'imagem') {
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0] 
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
    
            if (name === 'cliente') {
                const clienteSelecionado = clientes.find(cliente => cliente.id === clienteId);
                if (clienteSelecionado) {
                    setFormData(prevState => ({
                        ...prevState,
                        produto: clienteSelecionado.produto
                    }));

                    const produtoCategoria = getProdutoCategoria(clienteSelecionado.produto);
                    console.log("Categoria do produto:", produtoCategoria);

                    const tecnicosFiltrados = getTecnicosPorCategoria(produtoCategoria);
                    console.log("Técnicos por categoria:", tecnicosFiltrados);
                    
                    setTecnicosPorCategoria(tecnicosFiltrados); 
                }
            }
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/ordens', formData);
            alert("Ordem cadastrada!")
            setFormData({
                nome: '',
                produto: '',
                tecnico: '',
                descricaoProblema: '',
                imagem: null,
                status: '',
            })
            navigate('/ordens')
        } catch (error) {
            console.error("Erro ao cadastrar ordem:", error);            
        }
    };

    
    

    return (
        <section>
            <Container customClass="column">
                <h1>Cadastro de ordem de serviço</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.div_categoria}>
                        <label htmlFor="cliente">Cliente:</label>
                        <select id="cliente" name="cliente" value={formData.cliente} onChange={handleChange} required>
                            <option value="">Selecione o cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                            ))}
                        </select>
                    </div>
                    <Input label="Produto" type="text" name="produto" value={formData.produto} onChange={handleChange} required readOnly/>
                    <div className={styles.div_categoria}>
                        <label htmlFor="tecnico">Técnico:</label>
                        <select id="tecnico" name="tecnico" value={formData.tecnico} onChange={handleChange} required>
                            <option value="">Selecione o técnico</option>
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
                        <select id="status" name="status" value={formData.status} onChange={handleChange} required>
                            <option value="Aberta">Aberta</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="Concluida">Concluida</option>
                        </select>
                    </div>
                    <SubmitButton text="CADASTRAR" />
                </form>
            </Container>
        </section>
    )
}

export default OrdemCadastro;
