import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from "../styles/pages/IniciarSesion.module.css";

function IniciarSesion({ setIsAuthenticated, setUsuario }) {
    const navigate = useNavigate();
    const ubicacion = useLocation();

    const [formulario, setFormulario] = useState({ nombre: '', email: '' });


    const manejarEnvio = (e) => {
        e.preventDefault();
        if (formulario.nombre && formulario.email) {
            setIsAuthenticated(true);
            setUsuario(formulario);

            // Si venía del carrito, redirige a pagar
            if (ubicacion.state?.carrito) {
                navigate('/pagar', { state: { carrito: ubicacion.state.carrito } });
            } else {
                navigate('/productos');
            }
        } else {
            alert('Completa todos los datos');
        }
    };

    return (
        <main className={styles.pageFormulario}>
            <h1>Inicia sesión para continuar</h1>
            <div className={styles.tarjetaFormulario}>
                <form onSubmit={manejarEnvio} className={styles.formulario}>
                    <h3>Iniciar Sesión</h3>
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        value={formulario.nombre}
                        onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formulario.email}
                        onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
                        required
                    />
                    <div className={styles.cajaBoton}>
                        <button type="submit">Iniciar Sesión</button>
                        <strong> </strong>
                        <button type="button" onClick={() => navigate('/productos')}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default IniciarSesion;