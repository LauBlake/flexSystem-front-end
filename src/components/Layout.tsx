import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>FlexSystem</h1>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/settings">Configuración</Link>
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 FlexSystem. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default Layout