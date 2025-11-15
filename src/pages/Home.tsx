import Layout from '../components/Layout'

const Home = () => {
  return (
    <Layout>
      <div>
        <h2>Bienvenido a FlexSystem</h2>
        <p>
          FlexSystem es una plataforma de gestión empresarial flexible y moderna,
          construida con React y TypeScript.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <h3>Características principales:</h3>
          <ul>
            <li>Interfaz moderna y responsive</li>
            <li>Desarrollado con React 19 y TypeScript</li>
            <li>Construido con Vite para desarrollo rápido</li>
            <li>Configuración de linting con ESLint</li>
            <li>Enrutamiento con React Router</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default Home