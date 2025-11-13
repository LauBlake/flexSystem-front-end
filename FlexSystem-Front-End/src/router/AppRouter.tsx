import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlexisurLogin from '../Features/Users/components/login'
import FlexisurRegister from '../Features/Users/components/register'
import MakeOrder from '../Features/Pedido/components/MakeOrder.tsx'
import DetallePedido from '../Features/Pedido/components/DetallePedido'
import AdminPedidos from '../Features/Admin/components/AdminPedidos'
import Navigation from '../Core/components/Navigation';
import { PedidoProvider } from '../Features/Pedido/context/PedidoContext';
import { AuthProvider } from '../Features/Users/context/AuthContext';
import { ProtectedRoute } from '../Core/components/ProtectedRoute';
import { SupplySearch } from '../Features/Supplies/pages/SupplySearch.tsx';
import { CreateDealer } from '../Features/Admin/components/CreateDealer.tsx';

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
                <ProtectedRoute requiredRole='client'>
                  <MakeOrder />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pedido/supply-search" 
              element={
                <ProtectedRoute requiredRole='client'>
                  <SupplySearch />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/detalle-pedido" 
              element={
                <ProtectedRoute requiredRole='client'>
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
            <Route path="/dealer/create" 
            element={
              <ProtectedRoute requiredRole="admin">
                <CreateDealer />
              </ProtectedRoute>
            } />
          </Routes>
        </PedidoProvider>
      </AuthProvider>
    </Router>
    )
}

export default AppRouter;