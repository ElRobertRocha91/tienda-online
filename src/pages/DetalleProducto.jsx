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
        <div className={styles.pageDetalle}>
            <section id="detalle">
                <div className={styles.cajaDetalle}>
                    <div className={styles.tarjetaDetalle}>
                        <h2>Detalle del Producto {id}</h2>
                        <li key={producto.id}>
                            <div className={styles.flexDetalle}>
                                <img src={producto.avatar} alt={producto.nombre} className={styles.imageDetalle} />
                                <div className={styles.descripcionDetalle}>
                                    <h3 className={styles.nombreDetalle}>{producto.nombre}</h3>
                                    <p><strong>Descripción: </strong>{producto.descripcion}</p>
                                    <p className={styles.precioDetalle}>Precio: ${producto.precio}</p>
                                </div>
                            </div>
                            <Link to={'/productos'} className={styles.detalleLink}>Volver</Link>
                        </li>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DetalleProducto;