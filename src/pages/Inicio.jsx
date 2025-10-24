import { Link } from "react-router-dom";
import styles from "../styles/pages/Inicio.module.css";

function Inicio() {
    return (
        <main className={styles.home}>
            <section id="inicio">
                <div>
                    <div className={styles.card}>
                        <h2>Bienvenidos a Tienda Online</h2>
                        <h2>El mejor sitio para hacer tus compras</h2>
                        <h3>Tenemos los mejores precios para que puedas llevarte el productos que estas buscando.</h3>
                    </div>
                </div>
                <br />
                <br />
                <Link to="/productos" className={styles.homeLink}>Ver Productos</Link>
            </section>
        </main>
    )
}

export default Inicio;