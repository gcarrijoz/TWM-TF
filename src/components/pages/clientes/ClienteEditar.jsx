import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate} from "react-router-dom";

import Input from "../../form/Input"
import SubmitButton from "../../form/SubmitButton"
import Container from "../../layout/Container"

import styles from '../PaginaCadastro.module.css'

function ClienteEditar(){
    const { id } = useParams();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        whatsapp: '',
        cep: '',
        endereco: '',
        complemento: '',
        cidade: '',
        estado: ''
    });

    const [produtos, setProdutos] = useState([])

    useEffect(() => {

        async function fetchCliente() {
            try {
                const response = await axios.get(`http://localhost:5000/clientes/${id}`);
                const cliente = response.data;
                setFormData(cliente);
                console.log(cliente)
            } catch (error) {
                console.error('Erro ao buscar cliente:', error);
            }
        }

        async function fetchProdutos() {
            try {
                const response = await axios.get('http://localhost:5000/produtos')
                setProdutos(response.data)
            } catch (error) {
                console.error("Erro ao buscar produtos:", error)
            }
        }

        fetchCliente()
        fetchProdutos()
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/clientes/${id}`, formData);
            window.alert('Cliente editado com sucesso');
            navigate('/clientes');
        } catch (error) {
            console.error('Erro ao editar cliente:', error);
        }
    }

    return(
        <section>
            <Container customClass="column">
                <h1>Edição de cliente</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                <h3>Dados pessoais</h3>
                    <Input label="Nome completo" type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Jose Mendes" required />
                    <Input label="E-mail" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@email.com" required />
                    <Input label="Whatsapp" type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="(99) 99999-9999" required />
                    <h3>Endereço</h3>
                    <Input label="CEP" type="text" name="cep" value={formData.cep} onChange={handleChange} placeholder="99999-999" required />
                    <Input label="Endereço" type="text" name="endereco" value={formData.endereco} onChange={handleChange} placeholder="Rua Projeto Final, 10" required />
                    <Input label="Complemento" type="text" name="complemento" value={formData.complemento} onChange={handleChange} placeholder="Apto 100" />
                    <Input label="Cidade" type="text" name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Uberlândia" required />
                    <Input label="Estado" type="text" name="estado" value={formData.estado} onChange={handleChange} placeholder="MG" required />
                    <h3>Produto</h3>
                    <div className={styles.div_categoria}>
                        <label htmlFor="produto">Produto:</label>
                        <select id="produto" name="produto" value={formData.produto} onChange={handleChange} required>
                            <option value="">Selecione o produto</option>
                            {produtos.map(produto => (
                                <option key={produto.id} value={produto.nome}>{produto.nome}</option>
                            ))}
                        </select>
                    </div>
                    <SubmitButton text="EDITAR" />
                </form>
            </Container>
        </section>
    )
}

export default ClienteEditar
