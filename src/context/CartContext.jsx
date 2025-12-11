import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto
export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState([]);
    const [cargaCompleta, setCargaCompleta] = useState(false); // Flag o Bandera

    // Establecemos un useEffect() para establecerlo en el localStorage
    useEffect(() => {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            setCarrito(JSON.parse(carritoGuardado));
        }
        setCargaCompleta(true);
    }, []);// El array de dependencia lo dejamos vacio, para que cargue solo una vez cuando cargue el componente

    // Establecemos otro useEffect(), para que cada vez que carrito cambie, guardalo en localStorage
    useEffect(() => {
        if (cargaCompleta) { // Solo guarda en localstorage si la carga inicial ha terminado
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }
    }, [carrito, cargaCompleta]); // Le establecemos el array de dependencia para que cada vez que carrito y cargacompleta cambie, ejecute este useEffect();

    // Funciones para el carrito
    const agregarAlCarrito = (producto) => {
        setCarrito(prevCarrito => {
            const productoExistente = prevCarrito.find(item => item.id === producto.id);

            // Validamos si existe ese producto en el carrito y si existe sumamos la cantidad
            if (productoExistente) {
                return prevCarrito.map(item =>
                    item.id === producto.id ?
                        { ...item, cantidad: (item.cantidad || 1) + 1 }
                        : item
                );
            } else {
                return [
                    ...prevCarrito,
                    {
                        ...producto,
                        cantidad: 1
                    }
                ];
            }
        });
        toast.success(`Producto ${producto.nombre} agregado.`);
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const eliminarDelCarrito = (productoId) => {
        setCarrito(carrito.filter(item => item.id !== productoId));
    };

    // Lógica para sumar y restar cantidad
    const quitarCantidad = (id) => {
        const carritoActualizado = carrito.map(producto => {
            if (producto.id === id) {
                const cantidadActual = producto.cantidad || 1;
                if (cantidadActual === 1) {
                    return null;
                }
                return {
                    ...producto,
                    cantidad: cantidadActual - 1
                }
            }
            return producto;
        }).filter(producto => producto !== null);

        setCarrito(carritoActualizado);
    };

    const agregarCantidad = (id) => {
        const nuevoCarrito = carrito.map(producto => {
            if (producto.id === id) {
                return {
                    ...producto,
                    cantidad: (producto.cantidad || 1) + 1
                }
            }
            return producto;
        });
        setCarrito(nuevoCarrito);
    };

    // Lógica para calcular el costo total de la compra
    const total = carrito.reduce((sum, item) => {
        const cantidad = item.cantidad || 1;
        return sum + (Number(item.precio) * cantidad)
    }, 0);

    // Valor que se provee a todos los componentes 
    const value = {
        // Carrito
        carrito,
        agregarAlCarrito,
        vaciarCarrito,
        eliminarDelCarrito,
        // f(x) de Cantidad
        agregarCantidad,
        quitarCantidad,
        // f(x) Calcular el Total
        total
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext debe usarse dentro de CartProvider");
    }
    return context;
}