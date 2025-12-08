import { createContext, useContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export const ProductsProvicer = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Función de validación del producto en el contexto
    const validarProducto = (producto) => {
        const errores = {};

        // nombre
        if (!producto.nombre?.trim()) {
            errores.nombre = 'El nombre es obligatorio.';
        }

        // precio
        if (!producto.precio?.trim()) {
            errores.precio = 'El precio es obligatorio.';
        } else {
            const precioLimpio = producto.precio.toString().replace(/\./g, '').replace(',', '.');
            const precioNumerico = parseFloat(precioLimpio);

            if (!/^[\d.,]+$/.test(producto.precio.toString().replace(/\./g, ''))) {
                errores.precio = 'Solo números, puntos o comas.';
            } else if (isNaN(precioNumerico)) {
                errores.precio = 'Precio no válido.';
            } else if (precioNumerico <= 0) {
                errores.precio = 'Debe ser mayor a 0.';
            }
        }

        // descripción
        if (!producto.descripcion?.trim()) {
            errores.descripcion = 'La descripción es obligatoria.';
        } else if (producto.descripcion.length < 10) {
            errores.descripcion = 'Mínimo 10 caracteres.';
        } else if (producto.descripcion.length > 200) {
            errores.descripcion = 'Máximo 200 caracteres.';
        }

        return errores;
    }

    // Función para validar si el formulario es válido - nombre simplificado
    const validar = (producto) => {
        const errores = validarProducto(producto);
        return {
            esValido: Object.keys(errores).length === 0,
            errores
        }
    }

    // Carga de productos MockApi
    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const respuesta = await fetch('https://68ed704ddf2025af780033c1.mockapi.io/api/productos');
                if (!respuesta.ok) throw new Error("Error al cargar los productos de la API");
                const datos = await respuesta.json();
                setProductos(datos);
            } catch (error) {
                console.log("Error al cargar los productos:", error);
                setError("Hubo un problema al cargar los productos.");
            } finally {
                setCargando(false);
            }
        }
        cargarProductos();
    }, []);

    // f(x) para agregarProducto
    const agregarProducto = async (nuevoProducto) => {
        try {
            const respuesta = await fetch('https://68ed704ddf2025af780033c1.mockapi.io/api/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoProducto),
            });

            if (!respuesta.ok) throw new Error('Error al agregar el producto.');

            const data = await respuesta.json();
            setProductos(prev => [...prev, data]);
            // alert('Producto agregado correctamente');
            return data;
        } catch (error) {
            console.error("Error al agregar el producto");
            // alert('Hubo un problema al agregar el producto.');
            throw error;
        }
    };

    // f(x) para editar el producto
    const editarProducto = async (productoActualizado) => {
        try {
            const respuesta = await fetch(`https://68ed704ddf2025af780033c1.mockapi.io/api/productos/${productoActualizado.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoActualizado),
            });

            if (!respuesta.ok) throw new Error('Error al editar el producto');

            const data = await respuesta.json();
            setProductos(prev => prev.map(
                producto => producto.id === productoActualizado.id ? data : producto)
            );

            return data;
        } catch (error) {
            console.error("Error al editar el producto:", error);
            throw error;
        }
    }

    return (
        <ProductsContext.Provider
            value={{
                productos,
                cargando,
                error,
                validarProducto,
                validar,
                agregarProducto,
                editarProducto
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

// Hook personalizado para el contexto de productos
export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts debe ser usado dentro de un ProductsProvider");
    }
    return context;
}