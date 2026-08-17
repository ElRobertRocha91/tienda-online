import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import styles from "../styles/pages/Pagar.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

function Pagar() {
  const { usuario, cerrarSesion } = useAuthContext();
  const { carrito, total, vaciarCarrito, agregarCantidad, quitarCantidad, eliminarDelCarrito } = useCartContext();
  const navigate = useNavigate();

  // Obtengo el Token-Usuario
  const tokenActual = localStorage.getItem('authToken');

  // Función para finalizar compra
  const comprar = () => {
    if (carrito.length === 0) {
      toast.warn("Tu carrito está vacío.");
    } else if (window.confirm("¿Confirmas la compra?")) {
      toast.success("¡Compra realizada con éxito!");
      vaciarCarrito();
      navigate("/productos");
    }
  };

  return (
    <div className={styles.pagePagar}>
      <div className={styles.containerPagar}></div>
      <div className={styles.columnaCarrito}>
        <h2 className={styles.titleCarrito}>Carrito de compras</h2>
        {carrito.length === 0 ? (
          <p>El carrito esta vacío</p>
        ) : (
          <div className={styles.containerCarrito}>
            {carrito.map((producto) => (
              <div key={producto.id} className={styles.item}>
                <img src={producto.avatar}
                  alt={producto.nombre}
                  width="100"
                  height="100"
                />
                <div>
                  <h5>{producto.nombre}</h5>
                  <strong>${producto.precio}</strong>
                </div>
                <div className={styles.btnCantidad}>
                  <div className={styles.cantidad}>
                    <button onClick={() => quitarCantidad(producto.id)} className={styles.btn}>-</button>
                    <strong>{producto.cantidad || 1}</strong>
                    <button onClick={() => agregarCantidad(producto.id)} className={styles.btn}>+</button>
                  </div>
                  <div>
                    <button onClick={() => eliminarDelCarrito(producto.id)} className={styles.btnEliminar}><RiDeleteBin6Line /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.columnaPagar}>
        <div className={styles.importePagar}>
          <h3 className={styles.pagar}>Total: ${total.toFixed(3)}</h3>
          <div>
            <button onClick={comprar} className={styles.btnPagar}>Confirmar y Pagar</button>
          </div>
        </div>
        <button onClick={vaciarCarrito} className={styles.btnVaciarCarrito}>Vaciar Carrito</button>
        <button onClick={() => navigate("/productos")} className={styles.btnSeguirComprando}>Seguir Comprando</button>
      </div>
    </div>
  );
}

export default Pagar;