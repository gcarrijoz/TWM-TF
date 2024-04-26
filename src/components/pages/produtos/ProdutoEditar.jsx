import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate} from "react-router-dom";

import Input from "../../form/Input"
import SubmitButton from "../../form/SubmitButton"
import Container from "../../layout/Container"

import styles from '../PaginaCadastro.module.css'


function ProdutoEditar(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        categoria: '',
        mensalidade: '',
        franquia: ''
    })
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        async function fetchProduto() {
            try {
                const response = await axios.get(`http://localhost:5000/produtos/${id}`)
                const produto = response.data
                setFormData(produto)
            } catch (error) {
                console.error('Erro ao buscar produto:', error)
            }
        }

        async function fetchCategorias() {
            try {
                const response = await axios.get('http://localhost:5000/categorias')
                setCategorias(response.data)
            } catch (error) {
                console.error("Erro ao buscar categorias:", error)
            }
        }

        fetchProduto()
        fetchCategorias()
    }, [id])

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/produtos/${id}`, formData);
            window.alert('Produto editado com sucesso');
            navigate('/produtos');
        } catch (error) {
            console.error('Erro ao editar produto:', error);
        }
    }

    return(
        <section>
            <Container customClass="column">
                <h1>Edição de cliente</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input label="Nome" type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Seguro Top Premium" required/>
                    <div className={styles.div_descricao}>                    
                        <label htmlFor="descricao">Descrição:</label>
                        <textarea id="descricao" name="descricao" rows="4" cols="50" value={formData.descricao} onChange={handleChange} placeholder="Seguro completo contra perdas e furtos" required></textarea>
                    </div>
                    <div className={styles.div_categoria}>
                        <label htmlFor="categoria">Categoria:</label>
                        <select id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required>
                            <option value="">Selecione a categoria</option>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.nome}>{categoria.nome}</option>
                            ))}
                        </select>
                    </div>
                    <Input label="Mensalidade" type="text" name="mensalidade" value={formData.mensalidade} onChange={handleChange} placeholder="R$ 30" required/>
                    <Input label="Franquia" type="text" name="franquia" value={formData.franquia} onChange={handleChange} placeholder="R$ 500" required/>
                    <SubmitButton text="EDITAR"/>
                </form>
            </Container>
        </section>
    )
}

export default ProdutoEditar
