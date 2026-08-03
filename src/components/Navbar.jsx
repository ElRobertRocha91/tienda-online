import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import styles from "../styles/components/Navbar.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
    const { isAuthenticated, usuario, cerrarSesion } = useAuthContext();
    const { carrito, vaciarCarrito } = useCartContext();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

    const manejarCerrarSesion = () => {
        navigate("/productos");
        setIsOpen(false);

        // Pausa de 1" para asegurar la navegación
        setTimeout(() => {
            vaciarCarrito();
            cerrarSesion();
        }, 100);
    }

    return (
        <header className={styles.header}>
            <div className={styles.navTitle}>
                <div className={styles.iconoTienda}><FaShoppingBag /></div>
                <h2 className={styles.title}>Tienda Online</h2>
            </div>
            {/* MENU DE NAVEGACIÓN */}
            <nav>
                <ul className={styles.nav}>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? styles.activo : ""}>Inicio</NavLink></li>
                    <li><NavLink to="/productos" className={({ isActive }) => isActive ? styles.activo : ""}>Productos</NavLink></li>
                    <li><NavLink to="/usuario/pagar" className={({ isActive }) => isActive ? styles.activo : ""}>
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
                    </NavLink></li>
                    {/* Enlace para ADMIN - Solo visible para el Admin */}
                    {/* LOGIN - USUARIO - ADMIN */}
                    <li>
                        {
                            isAuthenticated ? (
                                <div className={styles.user}>
                                    <div className={styles.usuario}>
                                        {/* Enlace a el Dashboard y a Agregar Producto solo para Admin */}
                                        {usuario.password === "admin" && (
                                            <NavLink to="/dashboard" className={({ isActive }) => `${styles.dashboard} ${isActive ? styles.activo : "" }`}>Dashboard</NavLink>
                                        )}
                                        <span className={styles.name}>Hola, {usuario.password}</span>
                                    </div>
                                    <button onClick={manejarCerrarSesion} className={styles.session}>Cerrar Sesión</button>
                                </div>
                            ) : (
                                <NavLink to='/iniciar-sesion' className={({ isActive }) => isActive ? styles.activo : ""}>Iniciar Sesión</NavLink>
                            )
                        }
                    </li>
                </ul>
                {/* BOTON HAMBURGER - RESPONSIVE */}
                <button onClick={toggleMenu} aria-label="button" className={styles.button}>
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" className={styles.menu} fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" className={styles.menu} fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    )}
                </button>
                {/* LISTA - MENÚ - RESPONSIVE */}
                {isOpen && (
                    <div className={`${styles.navList} ${isOpen ? styles.open : ""}`}>
                        <Link to="/" onClick={toggleMenu} className={styles.list}>Inicio</Link>
                        <Link to="/productos" onClick={toggleMenu} className={styles.list}>Productos</Link>
                        <Link to="/usuario/pagar" onClick={toggleMenu}>
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
                        </Link>
                        {
                            isAuthenticated ? (
                                <div className={styles.user}>
                                    <div className={styles.usuario}>                                 
                                        {/* Enlace a el Dashboard y a Agregar Producto solo para Admin */}
                                        {usuario.password === "admin" && (
                                            <Link to="/dashboard" onClick={toggleMenu} className={styles.dashboard}>Dashboard</Link>
                                        )}
                                        <span className={styles.list}>Hola, {usuario.password}</span>
                                    </div>
                                    <button onClick={manejarCerrarSesion} className={styles.session}>Cerrar Sesión</button>
                                </div>
                            ) : (
                                <Link to="/iniciar-sesion" onClick={toggleMenu} className={styles.list}>Iniciar Sesión</Link>
                            )
                        }
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar;