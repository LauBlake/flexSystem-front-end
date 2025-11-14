import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { HoseEntityCreate, OrderEntityCreate } from '../order.interface.ts';


interface OrderContextType {
  order: OrderEntityCreate,
  activeHoseIndex: number,
  addHose: (hose: HoseEntityCreate) => void,
  deleteHose: (index: number) => void,
  addItem: () => void,
  deleteItem: (index: number) => void,
  switchToHose: (index: number) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);






export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('usePedidos debe ser usado dentro de PedidoProvider');
  }
  return context;
};






export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<OrderEntityCreate>({client: 0, hoses:[]});
  const [activeHoseIndex, setActiveHose] = useState<number>(-1);

  const addHose = (hose: HoseEntityCreate) => {
    let ord = order;
    ord.hoses.push(hose);
    setOrder(order);
  };

  const deleteHose = (index: number) => {
    if (index < 0 || index >= order.hoses.length) return;
    let ord = order;
    ord.hoses = ord.hoses.filter((_, i) => i === index);
    setOrder(order);
  };

  const addItem = () => {
    if (activeHoseIndex < 0) return;
    let hose = order.hoses[activeHoseIndex];
    hose.extra.push({amount: 1, supply: 0, type: "casing"})
    let ord = order;
    ord.hoses[activeHoseIndex] = hose;
    setOrder(ord);
  };

  const deleteItem = (index: number) => {
    if (index < 0 || activeHoseIndex < 0) return;
    let hose = order.hoses[activeHoseIndex];
    if (hose.extra.length <= index) return;
    hose.extra = hose.extra.filter((_, i) => i === index);
    let ord = order;
    ord.hoses[activeHoseIndex] = hose;
    setOrder(ord);
  };

  const switchToHose = (index: number) => {
    if (order.hoses.length <= index) return;
    setActiveHose(index);
  };

  return (
    <OrderContext.Provider value={{ order, activeHoseIndex, addHose, deleteHose, addItem, deleteItem, switchToHose}}>
      {children}
    </OrderContext.Provider>
  );
};
