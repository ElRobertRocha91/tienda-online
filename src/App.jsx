import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ProductsProvicer } from './context/ProductsContext'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import RutaProtegida from './pages/RutaProtegida'
import IniciarSesion from './pages/IniciarSesion'
import Pagar from './pages/Pagar'
import Dashboard from './pages/Dashboard'
import FormularioProducto from './components/FormularioProducto'
import EliminarProducto from './components/EliminarProducto'
import Layout from './components/Layout'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ProductsProvicer>
            <Layout>
              {/* <Navbar /> */}
              <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/productos' element={<Productos />} />
                <Route path='/productos/:id' element={<DetalleProducto />} />
                <Route path='/productos/:categoria/:id' element={<DetalleProducto />} />
                {/* Ruta Protegida - Solo Usuarios */}
                <Route path='/iniciar-sesion' element={<IniciarSesion />} />
                <Route path='/usuario/pagar' element={
                  <RutaProtegida>
                    <Pagar />
                  </RutaProtegida>
                } />
                {/* Ruta Protegiada - Solo Administrador */}
                <Route path='/dashboard' element={
                  <RutaProtegida soloAdmin={true}>
                    <Dashboard />
                  </RutaProtegida>
                } />
                <Route path='/formulario-producto' element={
                  <RutaProtegida soloAdmin={true}>
                    <FormularioProducto />
                  </RutaProtegida>
                } />
                <Route path='/eliminar-producto' element={
                  <RutaProtegida soloAdmin={true}>
                    <EliminarProducto />
                  </RutaProtegida>
                } />
                <Route path='*' element={<Navigate to="/" replace />} />
              </Routes>
              {/* <Footer /> */}
              <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                draggable
                pauseOnHover
              />
            </Layout>
          </ProductsProvicer>
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App
