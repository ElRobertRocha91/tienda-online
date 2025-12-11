import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import styles from "../styles/pages/Pagar.module.css";

function Pagar() {
  const { usuario, cerrarSesion } = useAuthContext();
  const { carrito, total, vaciarCarrito, agregarCantidad, quitarCantidad } = useCartContext();
  const navigate = useNavigate();

  // Obtengo el Token-Usuario
  const tokenActual = localStorage.getItem('authToken');

  // Función para finalizar compra
  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    vaciarCarrito();
    navigate("/productos");
  };

  return (
    <div className={styles.pagePagar}>
      <div className={styles.datoCliente}>
        <h2>Cliente: {usuario.password}</h2>
        <p>Email: {usuario.email}</p>
        {/* <strong>Token: <code>{tokenActual}</code></strong>
        <button onClick={cerrarSesion}>Cerrar sesión</button> */}
      </div>
      <hr />
      <div>
        <h2>Tu compra:</h2>
        {carrito.length === 0 ? (
          <p>El carrito esta vacío</p>
        ) : (
          <table className={styles.tablaCompra}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto) => (
                <tr key={producto.id}>
                  <td className={styles.colImagen}>
                    <img
                      src={producto.avatar}
                      alt={producto.nombre}
                      width="120"
                      height="100"
                    />
                  </td>
                  <td>
                    <span>{producto.nombre}</span>
                  </td>
                  <td>
                    <strong>${producto.precio}</strong>
                  </td>
                  <td>
                    Cantidad: {producto.cantidad || 1}
                  </td>
                  <td>
                    <button onClick={() => quitarCantidad(producto.id)} className={styles.btn}>-</button>
                    <button onClick={() => agregarCantidad(producto.id)} className={styles.btn}>+</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div>
          <h3 className={styles.pagar}>Total a pagar: ${total.toFixed(3)}</h3>
        </div>
      </div>

      <div className={styles.listBtn}>
        <button onClick={comprar} className={styles.celeste}>Confirmar y Pagar</button>
        <button onClick={vaciarCarrito} className={styles.rojo}>Vaciar Carrito</button>
        <button onClick={() => navigate("/productos")} className={styles.verde}>Seguir Comprando</button>
      </div>
    </div>
  );
}

export default Pagar;