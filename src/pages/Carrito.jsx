import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

function Carrito() {
    const { carrito, vaciarCarrito, agregarCantidad, quitarCantidad, total } = useCartContext();
    const navigate = useNavigate();

    const irAPagar = () => {
        navigate("/usuario/pagar", { state: { carrito } });
    };

    return (
        <div>
            <h2>Carrito de compras</h2>
            {/* Operador Ternario */}
            {carrito.length === 0 ? (
                <p>El carrito esta vacío</p>
            ) : (
                <>
                    {carrito.map((item) => (
                        <div key={item.id}>
                            {item.nombre} - ${Number(item.precio).toFixed(3)}
                            (Cantidad: {item.cantidad || 1})
                            <button onClick={() => quitarCantidad(item.id)}>-</button>
                            <button onClick={() => agregarCantidad(item.id)}>+</button>
                        </div>
                    ))}
                    <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#ff55', fontWeight: 'bold' }}>
                        Total: ${total.toFixed(3)}
                    </div>
                    <br />
                    <button onClick={vaciarCarrito}
                        style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#ff4444', color: 'white' }}
                    >
                        Vaciar Carrito
                    </button>
                    <br />
                    <button onClick={irAPagar}>Pagar</button>
                </>
            )}
        </div>
    )
}

export default Carrito;