import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/pages/Dashboard.module.css";

function Dashboard() {
    const { usuario, cerrarSesion } = useAuthContext();
    const navigate = useNavigate();

    // Obtengo el token actual
    const tokenActual = localStorage.getItem("authToken");

    // Función para navegar al formulario de agregar producto
    const manejarAgregarProducto = () => {
        navigate('/formulario-producto');
    };

    return (
        <main>
            <div className={styles.dashboard}>
                <h1>Dashboard Administrativo</h1>
                <div>
                    <p>
                        <strong>Sesión iniciada como:</strong> {usuario.nombre}
                    </p>

                    {/* Sección del Token */}
                    <div>
                        <strong>Token de autenticación</strong>
                        <br />
                        <code>{tokenActual}</code>
                    </div>

                    {/* Sección de acciones Admin */}
                    <div>
                        <h3>Acciones:</h3>
                        <div className={styles.acciones}>
                            <div className={styles.link}>
                                <button onClick={manejarAgregarProducto} className={styles.verde}>
                                    Agregar nuevo producto
                                </button>
                            </div>
                            <div className={styles.link}>
                                <Link to="/productos" className={styles.celeste}>Ver / Editar / Eliminar productos</Link>
                            </div>
                        </div>
                    </div>
                    <hr />

                    {/* Botón cerrar sesión */}
                    <button onClick={cerrarSesion} className={styles.rojo}>Cerrar sesión</button>
                </div>
            </div>
        </main>
    )
}

export default Dashboard; 