import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate} from "react-router-dom";

import Input from "../../form/Input"
import SubmitButton from "../../form/SubmitButton"
import Container from "../../layout/Container"

import styles from '../PaginaCadastro.module.css'


function TecnicoEditar(){
    const { id } = useParams();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        whatsapp: '',
        categoria: ''
    })

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        async function fetchTecnico() {
            try {
                const response = await axios.get(`http://localhost:5000/tecnicos/${id}`)
                const tecnico = response.data
                setFormData(tecnico)
            } catch (error) {
                console.error('Erro ao buscar tecnico:', error)
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

        fetchTecnico()
        fetchCategorias()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/tecnicos/${id}`, formData);
            window.alert('Tecnico editado com sucesso');
            navigate('/tecnicos');
        } catch (error) {
            console.error('Erro ao editar tecnico:', error);
        }
    }

    return(
        <section>
            <Container customClass="column">
                <h1>Edição de Técnicos</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input label="Nome completo" type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Jose Mendes" required/>
                    <Input label="E-mail" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@email.com" required/>
                    <Input label="Whatsapp" type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="(99) 99999-9999" required/>
                    <div className={styles.div_categoria}>
                        <label htmlFor="categoria">Categoria:</label>
                        <select id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required>
                            <option value="">Selecione a categoria</option>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.nome}>{categoria.nome}</option>
                            ))}
                        </select>
                    </div>                
                    <SubmitButton text="EDITAR"/>
                </form>

            </Container>
        </section>
    )
}


export default TecnicoEditar