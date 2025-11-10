import { useEffect, useState } from "react";
import { FilterSection } from "../../components/FilterSection.tsx";
import { FilterSelector } from "../../components/FilterSelector.tsx";
import { supplyService } from "../services/supplyService.ts";
import type { SupplyData } from "../supply.interface.ts";
import { SupplyCard } from "../components/SupplyCard.tsx";

export const SupplySearch = () => {
    const [supplyType, setSupplyType] = useState<string>("Todos");
    const [supplies, setSupplies] = useState<SupplyData[]>([]);

    useEffect(() => {
        const searchSupplies = async () => {
            try {
                const result = await supplyService.searchSupplies({});
                setSupplies(result);
            } catch (error) {
                console.log(error);
            }
        }
        searchSupplies();
    }, [supplyType]);

    return (
        <div className="global-container">
            <div className="global-card">
                <div className="global-header">
                    Busqueda de pedidos
                </div>
                <div className="global-main">
                    <FilterSection>
                        <FilterSelector 
                            value={supplyType} 
                            setValue={setSupplyType} 
                            label="Tipo de insumo:"
                        >
                            <option value=''>Todos</option>
                            <option value='Casing'>Mallas</option>
                            <option value='Screw'>Tuercas</option>
                            <option value='Elbow'>Codos</option>
                            <option value='Connector'>Conector</option>
                            <option value='Tube'>Caño</option>
                        </FilterSelector>
                    </FilterSection>
                    <div className="global-content">

                    </div>
                    <table className="global-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Valor</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {supplies.map((sup : SupplyData, index: number) => {
                                return (
                                    <SupplyCard index={index} supplyId={sup.supplyId} type={sup.type} price={sup.price}> 
                                        <button 
                                            className="btn-add"
                                        >
                                            Acción
                                        </button>
                                    </SupplyCard>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};