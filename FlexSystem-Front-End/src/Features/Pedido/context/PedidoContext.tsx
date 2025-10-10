import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ItemPedido {
  id: number;
  descripcion: string;
  cantidad?: number;
}

export interface PedidoCompleto {
  id: number;
  camisa: ItemPedido | null;
  cano: ItemPedido | null;
  tuercas: ItemPedido[];
  agregados: ItemPedido[];
  descripcion: string;
  importe: number;
  fechaCreacion: Date;
  estado: 'pendiente' | 'procesando' | 'completado' | 'cancelado';
}

interface PedidoContextType {
  pedidos: PedidoCompleto[];
  agregarPedido: (pedido: Omit<PedidoCompleto, 'id' | 'fechaCreacion' | 'estado'>) => void;
  eliminarPedido: (id: number) => void;
  actualizarEstadoPedido: (id: number, estado: PedidoCompleto['estado']) => void;
}

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export const usePedidos = () => {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error('usePedidos debe ser usado dentro de PedidoProvider');
  }
  return context;
};

export const PedidoProvider = ({ children }: { children: ReactNode }) => {
  const [pedidos, setPedidos] = useState<PedidoCompleto[]>([]);

  const agregarPedido = (pedidoData: Omit<PedidoCompleto, 'id' | 'fechaCreacion' | 'estado'>) => {
    const nuevoPedido: PedidoCompleto = {
      ...pedidoData,
      id: Date.now(), // Genera un ID único basado en timestamp
      fechaCreacion: new Date(),
      estado: 'pendiente'
    };
    
    setPedidos(prevPedidos => [...prevPedidos, nuevoPedido]);
  };

  const eliminarPedido = (id: number) => {
    setPedidos(prevPedidos => prevPedidos.filter(p => p.id !== id));
  };

  const actualizarEstadoPedido = (id: number, estado: PedidoCompleto['estado']) => {
    setPedidos(prevPedidos =>
      prevPedidos.map(p => p.id === id ? { ...p, estado } : p)
    );
  };

  return (
    <PedidoContext.Provider value={{ pedidos, agregarPedido, eliminarPedido, actualizarEstadoPedido }}>
      {children}
    </PedidoContext.Provider>
  );
};
