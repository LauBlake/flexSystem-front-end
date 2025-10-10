import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlexisurLogin from '../Features/Users/components/login'
import FlexisurRegister from '../Features/Users/components/register'
import Pedido from '../Features/Pedido/components/Pedido'
import DetallePedido from '../Features/Pedido/components/DetallePedido'
import AdminPedidos from '../Features/Admin/components/AdminPedidos'
import Navigation from '../Core/components/Navigation';
import { PedidoProvider } from '../Features/Pedido/context/PedidoContext';
import { AuthProvider } from '../Features/Users/context/AuthContext';
import { ProtectedRoute } from '../Core/components/ProtectedRoute';

const AppRouter = () => {
    return(
    <Router>
      <AuthProvider>
        <Navigation />
        <PedidoProvider>
          <Routes>
            <Route path="/" element={<h1>Hola mundo</h1>} />
            <Route path="/login" element= {<FlexisurLogin />} />
            <Route path="/register" element= {<FlexisurRegister />} />
            <Route 
              path="/pedido" 
              element={
                <ProtectedRoute>
                  <Pedido />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/detalle-pedido" 
              element={
                <ProtectedRoute>
                  <DetallePedido />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-pedidos" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPedidos />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </PedidoProvider>
      </AuthProvider>
    </Router>
    )
}

export default AppRouter;