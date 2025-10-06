import Layout from '../components/Layout'

const Dashboard = () => {
  return (
    <Layout>
      <div>
        <h2>Dashboard</h2>
        <p>Panel de control principal del sistema FlexSystem.</p>
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', border: '1px solid #dee2e6' }}>
              <h4>Usuarios Activos</h4>
              <p style={{ fontSize: '2rem', margin: '0', color: '#007bff' }}>142</p>
            </div>
            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', border: '1px solid #dee2e6' }}>
              <h4>Proyectos</h4>
              <p style={{ fontSize: '2rem', margin: '0', color: '#28a745' }}>23</p>
            </div>
            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', border: '1px solid #dee2e6' }}>
              <h4>Tareas Completadas</h4>
              <p style={{ fontSize: '2rem', margin: '0', color: '#ffc107' }}>89%</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard