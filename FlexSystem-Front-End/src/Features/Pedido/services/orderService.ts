import { apiClient } from "../../service/api";
import type { SupplyEntity } from "../../Supplies/supply.interface.ts";
import { authService } from "../../Users/service/authService";
import type { OrderEntity, OrderQuery, HoseEntity, SupplyHoseItem, SupplyType } from "../order.interface";


const formatQuery = (query: OrderQuery): string => {
  let result = "";

  if (query.state) result = result.concat(`&state=${query.state}`);
  if (query.orderId) result = result.concat(`&orderId=${query.orderId}`);

  if (query.date) {
    const dateSplit = query.date.split("/");
    const day = dateSplit[0] ?? null;
    const month =
      dateSplit[1] ??
      String(new Date().getMonth() + 1).padStart(2, "0");
    const year = dateSplit[2] ?? String(new Date().getFullYear());
    const formattedYear =
      year.length === 4 ? year : "2" + year.padStart(3, "0");
    const formattedDate =
      formattedYear +
      "-" +
      month.padStart(2, "0") +
      "-" +
      (day ?? "01").padStart(2, "0");

    result = result.concat(
      `&from=${formattedDate}T00:00:00&to=${formattedDate}T23:59:59`
    );
  }

  // saco el & inicial si quedó
  return result.startsWith("&") ? result.slice(1) : result;
};

export const orderService = {
  async searchOrders(query: OrderQuery): Promise<OrderEntity[]> {
    const usrInfo = authService.getUserInfo();

    // por si role es array, tomo el primero. Ajustá según tu JWT
    const role = Array.isArray(usrInfo?.role)
      ? usrInfo?.role[0]
      : usrInfo?.role;

    const userEndpoint = role ? `search-${role}` : "search-admin";

    try {
      const response = await apiClient.get(
        `orders/${userEndpoint}?${formatQuery(query)}`
      );

      // response.data viene del backend como "any"
      return (response.data as any[]).map<OrderEntity>((order: any) => {
        // mapeamos hose (backend) → hoses (frontend)
        const hoses: HoseEntity[] = (order.hose ?? []).map(
          (hose: any): HoseEntity => ({
            hoseId: hose.id, // si tu DTO se llama distinto, ajustá acá
            description: hose.description,
            length: Number(hose.length),
            ammount: hose.ammount,
            correction: hose.correction ?? null,
            supplyHose: (hose.supplyHose ?? []).map(
              (item: any): SupplyHoseItem => ({
                amount: Number(item.amount),
                type: item.type as SupplyType,
                supply: item.supply as SupplyEntity,
              })
            ),
          })
        );

        // calculo total del pedido (aunque tu OrderEntity no lo expone, lo dejo por si lo querés usar)
        let orderPrice = 0;
        for (const hose of hoses) {
          for (const item of hose.supplyHose) {
            const price = Number((item.supply as any)?.price ?? 0);
            orderPrice += item.amount * price;
          }
        }

        // formateo fecha a dd/MM/yyyy HH:mm
        let formattedDate: string;
        if (typeof order.orderDate === "string" && order.orderDate.includes("T")) {
          const [date, time] = order.orderDate.split("T");
          const [year, month, day] = date.split("-");
          const [hours, minutes] = time.split(":");
          formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
        } else {
          formattedDate = String(order.orderDate);
        }

        const mapped: OrderEntity = {
          orderId: order.id,
          state: order.state,
          orderDate: formattedDate,
          client: order.client, // as ClientInfo si querés tipar fuerte
          hoses,
        };

        return mapped;
      });
    } catch (error) {
      throw new Error(
        "Error consulting orders: " + (error as Error).message
      );
    }
  },

  async setInProcess(orderId: number) {
    const token = localStorage.getItem("authToken"); // 👈 ojo: que coincida con tu STORAGE_KEY
    const res = await fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ state: "InProcess" }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `No se pudo actualizar. HTTP ${res.status} ${text}`
      );
    }
    return res.json();
  },
};