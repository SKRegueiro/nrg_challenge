import type Counterparty from "@/types/Counterparty";

type Deal = {
  id: string;
  code: string;
  trade_date: string;
  status: string;
  proposed_to: string;
  sense: string;
  volume: number;
  measurement_unit: string;
  fixed_price: number;
  counterparty: Counterparty;
  commodity_group: string;
  broker: string;
};

export default Deal;
