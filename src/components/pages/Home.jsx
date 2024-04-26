import Container from "../layout/Container"
import logo from "../img/logoHome.png"

import styles from "./Home.module.css"



function Home(){
    return(
        <section>
            <Container customClass="column">
                <h1>Home</h1>
                <div className={styles.box_img}>
                    <img src={logo} alt="logo"/>
                </div>            
            </Container>
        </section>
    )
}

export default Home