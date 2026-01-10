import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import styles from "../styles/pages/IniciarSesion.module.css";

function IniciarSesion() {
    const { iniciarSesion } = useAuthContext();
    const navigate = useNavigate();
    const ubicacion = useLocation();

    const [formulario, setFormulario] = useState({ password: '', email: '' });

    const manejarEnvio = (e) => {
        e.preventDefault();
        if (formulario.password === "admin" && formulario.email === "1234@admin") {
            localStorage.setItem("authEmail", formulario.email);
            iniciarSesion("admin", formulario.email);
            navigate("/dashboard");

        } else if (formulario.password && formulario.email && formulario.password !== "admin") {
            localStorage.setItem("authEmail", formulario.email);
            iniciarSesion(formulario.password, formulario.email);
            // Si venía del carrito, redirige a pagar
            if (ubicacion.state?.carrito) {
                navigate('/usuario/pagar', { state: { carrito: ubicacion.state.carrito } });
            } else {
                navigate('/productos');
            }

        } else {
            alert('Credenciales de administrador incorrectas. Usa: admin / 1234@admin');
        }
    };

    return (
        <div className={styles.pageFormulario}>
            {/* <h1>Inicia sesión para continuar</h1> */}
            <div className={styles.tarjetaFormulario}>
                <form onSubmit={manejarEnvio} className={styles.formulario}>
                    <h1 className={styles.titleLogin}>Iniciar Sesión</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formulario.email}
                        onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={formulario.password}
                        onChange={(e) => setFormulario({ ...formulario, password: e.target.value })}
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
        </div>
    );
}

export default IniciarSesion;