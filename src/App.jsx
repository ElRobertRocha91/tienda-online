import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import RutaProtegida from './pages/RutaProtegida'
import IniciarSesion from './pages/IniciarSesion'
import Pagar from './pages/Pagar'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <>
      <AuthProvider>
        <Navbar />
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
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
