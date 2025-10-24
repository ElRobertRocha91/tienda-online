import { Link } from "react-router-dom";
import styles from "../styles/components/Navbar.module.css";

function Navbar() {
    return (
        <header className={styles.header}>
            <h2 className={styles.title}>Tienda Online</h2>
            <nav>
                <ul className={styles.nav}>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/productos">Productos</Link></li>
                    <li><Link to="/iniciar-sesion">Iniciar Sesión</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;