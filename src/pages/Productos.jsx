import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import Loading from "../components/Loading";
import Carrito from "./Carrito";
import styles from "../styles/pages/Productos.module.css";

function Productos() {
    const { productos, cargando, error } = useProducts();
    // const [productos, setProductos] = useState([]);
    // const [cargando, setCargando] = useState(true);
    // const [error, setError] = useState(null);
    const { agregarAlCarrito } = useCartContext();
    const navigate = useNavigate();
    const { esAdmin } = useAuthContext();

    // useEffect(() => {
    //     fetch('https://68ed704ddf2025af780033c1.mockapi.io/api/productos')
    //         .then((respuesta) => respuesta.json())
    //         .then((datos) => {
    //             setProductos(datos);
    //             setCargando(false);
    //         })
    //         .catch((error) => {
    //             console.log('Error: ', error);
    //             setError('Hubo un problema al cargar los productos.');
    //             setCargando(false);
    //         });
    // }, []);

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
            <h1>Lista de Productos</h1>
            <br />
            <ul className={styles.lista}>
                {productos.map((producto) => (
                    <li key={producto.id} className={styles.item}>
                        <br />
                        <img src={producto.avatar} alt={producto.nombre} width="200px" />
                        <br />
                        {producto.nombre}
                        <br />
                        Precio: ${producto.precio}
                        <br />
                        <button className={styles.link}>
                            <Link to={`/productos/${producto.categoria || "sin-categoria"}/${producto.id}`} state={{ producto }}>Más detalle</Link>
                        </button>
                        <br />
                        <button onClick={() => agregarAlCarrito(producto)}>Comprar</button>
                        {/* Botón Editar - SOLO visible para el admin */}
                        {esAdmin && (
                            <div>
                                <button onClick={() => manejarEditar(producto)}>
                                    Editar
                                </button>
                                <button onClick={() => manejarEliminar(producto)}>
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <Carrito />
        </main>
    )
}

export default Productos;