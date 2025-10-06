import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlexisurLogin from '../Features/Users/components/login'
import FlexisurRegister from '../Features/Users/components/register'
import Pedido from '../Features/Pedido/components/Pedido'
import DetallePedido from '../Features/Pedido/components/DetallePedido'
import Navigation from '../Core/components/Navigation';

const AppRouter = () => {
    return(
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hola mundo</h1>} />
        <Route path="/login" element= {<FlexisurLogin />} />
        <Route path="/register" element= {<FlexisurRegister />} />
        <Route path="/pedido" element= {<Pedido />} />
        <Route path="/detallepedido" element= {<DetallePedido />} />
      </Routes>
    </Router>
    )
}

export default AppRouter;