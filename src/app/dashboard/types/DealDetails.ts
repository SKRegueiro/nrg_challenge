export type DealDetails = {
    id: string;
    counterparty: {
      id: number;
      name: string;
      type: number;
    };
    commodity_group: {
      id: number;
      name: string;
      short_name: string;
      measurement_unit: string;
      df_rounding: number;
    };
    broker: string;
    code: string;
    trade_date: string;
    status: number;
    proposed_to: number;
    sense: number;
    volume: number;
    fixed_price: number;
    is_billing: number;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
};
