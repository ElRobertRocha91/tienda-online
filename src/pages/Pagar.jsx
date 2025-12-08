import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";

function Pagar() {
  const { usuario, cerrarSesion } = useAuthContext();
  const { carrito, total, vaciarCarrito } = useCartContext();
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
    <div>
      <div>
        <h2>{usuario.nombre}</h2>
        <p>Email: {usuario.email}</p>
        <strong>Token: <code>{tokenActual}</code></strong>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
        <hr />
      </div>

      <div>
        <h2>Tu compra:</h2>

        {carrito.map((producto) => (
          <div key={producto.id}>
            <img src={producto.avatar} alt={producto.nombre} width="60" />
            <span>{producto.nombre}</span>
            <strong>${producto.precio}</strong>
          </div>
        ))}

        <h3>Total a pagar: ${total}</h3>
      </div>

      <div>
        <button onClick={comprar}>Confirmar y Pagar</button>
        <button onClick={() => navigate("/productos")}>Cancelar</button>
      </div>
    </div>
  );
}

export default Pagar;