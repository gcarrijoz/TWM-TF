import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../img/logo.png'
import Container from './Container'

function Navbar() {
    return(
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img className={styles.logo} src={logo} alt="" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/clientes">Clientes</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/produtos">Produtos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/tecnicos">Técnicos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/ordens">Ordens de Serviço</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/gabriel">Gabriel</Link>
                    </li>
                </ul>
            </Container>

        </nav>        

    )
}

export default Navbar