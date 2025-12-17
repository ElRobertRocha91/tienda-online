import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import Loading from "../components/Loading";
// import Carrito from "./Carrito";
import styles from "../styles/pages/Productos.module.css";

function Productos() {
    const { productos, cargando, error } = useProducts();
    const { agregarAlCarrito } = useCartContext();
    const navigate = useNavigate();
    const { esAdmin } = useAuthContext();
    const [paginaActual, setPaginaActual] = useState(1);
    const [busqueda, setBusqueda] = useState("");

    // Paginado
    const productosPorPagina = 6;

    const productosFiltrados = productos.filter(
        (producto) =>
            producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            (producto.categoria &&
                producto.categoria.toLowerCase().includes(busqueda.toLowerCase()))
    );

    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

    // Cambiar de página
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    // Resetear a página 1 con búsquedas
    const manejarBusqueda = (e) => {
        setBusqueda(e.target.value);
        setPaginaActual(1);
    };

    const manejarDetalle = (producto) => {
        navigate(`/productos/${producto.categoria || "sin-categoria"}/${producto.id}`, { state: { producto } })
    }

    const manejarEliminar = (producto) => {
        // Navegar a la página de confirmación de eliminación
        navigate('/eliminar-producto', { state: { producto } });
    };

    const manejarEditar = (producto) => {
        // Navegar al formulario de edición
        navigate('/formulario-producto', { state: { producto } });
    };

    if (cargando) {
        return <Loading />
    }
    if (error) {
        return <p>{error}</p>
    }

    return (
        <main>
            <h1 className={styles.titulo}>Lista de Productos</h1>
            <br />
            {/* Barra de búsqueda */}
            <div className={styles.containerBusqueda}>
                <div className={styles.flexBusqueda}>
                    <label className={styles.labelBusqueda}>Buscar productos</label>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o categoría..."
                        className={styles.inputBusqueda}
                        value={busqueda}
                        onChange={manejarBusqueda}
                    />
                </div>
            </div>
            <ul className={styles.lista}>
                {productosActuales.map((producto) => (
                    <li key={producto.id} className={styles.item}>
                        <br />
                        <img src={producto.avatar} alt={producto.nombre} className={styles.image} />
                        <h3 className={styles.nombreProducto}>{producto.nombre}</h3>
                        <p className={styles.precioProducto}>Precio: ${producto.precio}</p>
                        {/* Botón Visible */}
                        <button className={styles.link} onClick={() => manejarDetalle(producto)}>Ver detalle</button>
                        <button onClick={() => agregarAlCarrito(producto)} className={styles.compra}>Comprar</button>

                        {/* Botón Editar y Eliminar - SOLO visible para el admin */}
                        {esAdmin && (
                            <div className={styles.botonAdmin}>
                                <button onClick={() => manejarEditar(producto)} className={styles.editar}>
                                    Editar
                                </button>
                                <button onClick={() => manejarEliminar(producto)} className={styles.eliminar}>
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {/* Paginador */}
            {productosFiltrados.length > productosPorPagina && (
                <div className={styles.cardPaginado}>
                    {Array.from({ length: totalPaginas }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`${styles.botonPaginado} ${paginaActual === index + 1 ? styles.activo : styles.inactivo}`}
                            onClick={() => cambiarPagina(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
            {/* <Carrito /> */}
        </main>
    )
}

export default Productos;