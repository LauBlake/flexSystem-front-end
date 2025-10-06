import Layout from '../components/Layout'

const Settings = () => {
  return (
    <Layout>
      <div>
        <h2>Configuración</h2>
        <p>Administra la configuración del sistema FlexSystem.</p>
        <div style={{ marginTop: '2rem' }}>
          <form>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Nombre de la empresa:
              </label>
              <input 
                type="text" 
                placeholder="Ingresa el nombre de tu empresa"
                style={{ 
                  width: '100%', 
                  maxWidth: '400px',
                  padding: '0.5rem', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px' 
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Email de contacto:
              </label>
              <input 
                type="email" 
                placeholder="contacto@empresa.com"
                style={{ 
                  width: '100%', 
                  maxWidth: '400px',
                  padding: '0.5rem', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px' 
                }}
              />
            </div>
            <button 
              type="submit"
              style={{ 
                background: '#007bff', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Guardar Configuración
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Settings