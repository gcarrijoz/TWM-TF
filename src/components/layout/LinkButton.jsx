import { Link } from "react-router-dom"
import styles from "./LinkButton.module.css"

function LinkButton({tipo, destino, text}){
    return (
        <div className={`${styles[tipo]}`}>
            <Link className={styles.btn} to={destino}>{text}
        </Link>
        </div>        
    )
}

export default LinkButton