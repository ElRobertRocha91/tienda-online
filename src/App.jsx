import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import RutaProtegida from './pages/RutaProtegida'
import IniciarSesion from './pages/IniciarSesion'
import Pagar from './pages/Pagar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: "", email: "" });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/productos/:id' element={<DetalleProducto />} />
        <Route path='/productos/:categoria/:id' element={<DetalleProducto />} />
        <Route path='/iniciar-sesion' element={<IniciarSesion setIsAuthenticated={setIsAuthenticated} setUsuario={setUsuario} />} />
        <Route path='/usuario/pagar'
          element={
            <RutaProtegida isAuthenticated={isAuthenticated}>
              <Pagar
                setIsAuthenticated={setIsAuthenticated}
                setUsuario={setUsuario}
                usuario={usuario}
              />
            </RutaProtegida>
          }
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
