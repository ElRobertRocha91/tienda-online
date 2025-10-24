import { Link, useLocation, useParams } from "react-router-dom";
import styles from "../styles/pages/DetalleProducto.module.css";

function DetalleProducto() {
    const { id } = useParams();
    const location = useLocation();
    const producto = location.state?.producto;

    if (!producto) {
        return (
            <div>
                <p>No se pudo cargar el producto.</p>
                <br />
                <Link to="/productos">Volver a productos.</Link>
            </div>
        )
    }
    return (
        <main className={styles.pageDetalle}>
            <section id="detalle">
                <div className={styles.cajaDetalle}>
                    <div className={styles.tarjetaDetalle}>
                        <h2>Detalle del Producto {id}</h2>
                        <li key={producto.id}>
                            <h3>{producto.nombre}</h3>
                            <p>Precio: ${producto.precio}</p>
                            <p><strong>Descripción: </strong>{producto.descripcion}</p>
                            <img src={producto.avatar} alt={producto.nombre} width="60%" />
                            <br />
                            <br />
                            <Link to={'/productos'} className={styles.detalleLink}>Volver</Link>
                        </li>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default DetalleProducto;