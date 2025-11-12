import { createContext, useContext } from "react";
import type { HoseData } from "../order.interface.ts";


interface MakeOrderContextType {
    hoses: HoseData[],
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
