import { env } from "@/env";
import { getServerAuthSession } from "@/server/auth";
import Deal from "@/app/dashboard/types/Deal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  //TODO: extract this to a service and clean up types
  const contracts = await fetch(
    env.NEXT_PUBLIC_API_URL + "/api/deals/?scenario=datatable",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${session?.user.token}`,
      },
    },
  );
  const contracts_json: Deal[] = await contracts.json();

  return (
    <div className={"p-4"}>
      <h2 className={"pb-4 text-3xl font-bold tracking-tight"}>Dashboard</h2>
      <div className="flex flex-wrap gap-4">
        {[...contracts_json, ...contracts_json, ...contracts_json].map(
          (deal) => (
            <Card
              key={deal.id}
              className="w-1/5 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-bold">{deal.code}</h2>
                  <Badge
                    className="mt-1"
                    variant={
                      deal.status === "Verified" ? "secondary" : "destructive"
                    }
                  >
                    {deal.status}
                  </Badge>
                </div>
                <div>
                  <span className="text-gray-500">Broker: {deal.broker}</span>
                </div>
              </div>
              <div className="mt-2">
                <p>Counterparty: {deal.counterparty.name}</p>
                <p>
                  Volume: {deal.volume} {deal.measurement_unit}
                </p>
                <p>Fixed Price: ${deal.fixed_price}</p>
                <p>
                  Trade Date: {new Date(deal.trade_date).toLocaleDateString()}
                </p>
                <p>Sense: {deal.sense}</p>
              </div>
              <Button className="mt-4">View Details</Button>
            </Card>
          ),
        )}
      </div>
    </div>
  );
}
