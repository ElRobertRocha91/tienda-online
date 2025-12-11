import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/Dashboard.module.css";
import { BsCloudArrowUp } from "react-icons/bs";
import { BsBoxes } from "react-icons/bs";
import { BsPen } from "react-icons/bs";

function Dashboard() {
    const { usuario, cerrarSesion } = useAuthContext();
    const navigate = useNavigate();

    // Obtengo el token actual
    const tokenActual = localStorage.getItem("authToken");

    // Función para navegar al formulario de agregar producto
    const manejarAgregarProducto = () => {
        navigate('/formulario-producto');
    };

    const manejarProductos = () => {
        navigate('/productos');
    };

    return (
        <main>
            <div className={styles.dashboard}>
                <div className={styles.nav}>
                    <h1>Dashboard</h1>
                    <p className={styles.nombreSesionAdmin}><strong>Sesión iniciada como:</strong> {usuario.email}</p>
                    {/* Sección del Token */}
                    <div className={styles.token}>
                        <strong>Token de autenticación: </strong>
                        <code>{tokenActual}</code>
                    </div>
                    {/* Botón cerrar sesión */}
                    <button onClick={cerrarSesion} className={styles.rojo}>Cerrar sesión</button>
                </div>
                {/* Sección de acciones Admin */}
                <section id="acciones">
                    <div className={styles.seccionAcciones}>
                        <h2>Acciones</h2>
                        <div className={styles.acciones}>
                            <div className={styles.link}>
                                <div className={styles.icon}>
                                    <BsCloudArrowUp />
                                    {/* <WiCloudUp /> */}
                                </div>
                                <button onClick={manejarAgregarProducto} className={styles.botonTarjeta}>
                                    Agregar nuevo producto
                                </button>
                            </div>
                            <div className={styles.link}>
                                <div className={styles.icon}>
                                    <BsPen />
                                </div>
                                <button onClick={manejarProductos} className={styles.botonTarjeta}>
                                    Editar / Eliminar productos
                                </button>
                            </div>
                            <div className={styles.link}>
                                <div className={styles.icon}>
                                    <BsBoxes />
                                </div>
                                <button className={styles.botonTarjeta}>
                                    Stock de productos
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                </section>
            </div>
        </main>
    )
}

export default Dashboard; 