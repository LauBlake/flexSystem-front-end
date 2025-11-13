import { createContext, useContext } from "react";
import type { HoseEntity } from "../order.interface.ts";


interface MakeOrderContextType {
    hoses: HoseEntity[],
}


const MakeOrderContext = createContext<MakeOrderContextType | undefined>(undefined);



export const useMakeOrder = () => {
  const context = useContext(MakeOrderContext);
  if (!context) {
    throw new Error('usePedidos debe ser usado dentro de PedidoProvider');
  }
  return context;
};


export const MakeOrderProvider = () => {

}
