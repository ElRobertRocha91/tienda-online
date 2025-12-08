import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import styles from "../styles/components/Navbar.module.css";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
    const { isAuthenticated, usuario, cerrarSesion } = useAuthContext();
    const { carrito, vaciarCarrito } = useCartContext();
    const navigate = useNavigate();

    const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);
    console.log(totalItemsCarrito);
    const manejarCerrarSesion = () => {
        navigate("/productos");

        // Pausa de 1" para asegurar la navegación
        setTimeout(() => {
            vaciarCarrito();
            cerrarSesion();
        }, 100);
    }

    return (
        <header className={styles.header}>
            <h2 className={styles.title}>Tienda Online</h2>
            <nav>
                <ul className={styles.nav}>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/productos">Productos</Link></li>
                    <li><Link to="/usuario/pagar">
                        <div className={styles.contenedorCarrito}>
                            <span className={styles.carrito}>Carrito</span>
                            <div className={styles.iconoCarrito}>
                                <FaShoppingCart />
                            </div>
                            {totalItemsCarrito > 0 && (
                                <div className={styles.contador}>
                                    {totalItemsCarrito}
                                </div>
                            )}
                        </div>
                    </Link></li>
                    {/* Enlace para ADMIN - Solo visible para el Admin */}
                    {/* {usuario?.nombre === "admin" && (
                        <li><Link to="/formulario-producto">Agregar Producto</Link></li>
                    )} */}
                    {/* LOGIN - USUARIO - ADMIN */}
                    <li>
                        {
                            isAuthenticated ? (
                                <div className={styles.user}>
                                    <div className={styles.usuario}>
                                        <span>Hola, {usuario.nombre}</span>
                                        {/* <span>Carrito: ({carrito.length})</span> */}
                                        {/* Enlace a el Dashboard y a Agregar Producto solo para Admin */}
                                        {usuario.nombre === "admin" && (
                                            <Link to="/dashboard" className={styles.dashboard}>Dashboard</Link>
                                        )}
                                        {usuario?.nombre === "admin" && (
                                            <Link to="/formulario-producto">Agregar Producto</Link>
                                        )}
                                    </div>
                                    <button onClick={manejarCerrarSesion} className={styles.session}>Cerrar Sesión</button>
                                </div>
                            ) : (
                                <Link to='/iniciar-sesion'>Iniciar Sesión</Link>
                            )
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;