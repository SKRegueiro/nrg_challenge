"use client";

import { useState } from "react";
import type Deal from "@/app/dashboard/types/Deal";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DealDetailsModal } from "@/app/dashboard/ui/dealDetailsModal";
import type { DealDetails } from "@/app/dashboard/types/DealDetails";

export default function DashboardClient({ deals }: { deals: Deal[] }) {
  const [filterBy, setFilterBy] = useState<string>("");
  const [selectedDeal, setSelectedDeal] = useState<DealDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSeeDetails = async (dealId: string) => {
    try {
      const response = await fetch(`/api/deals/details/${dealId}`);
      const data = (await response.json()) as DealDetails;
      setSelectedDeal(data);
      setIsModalOpen(true);

      if (response.ok) {
        console.log("Deal Details:", data);
      } else {
        console.error("Failed to fetch deal details");
      }
    } catch (error) {
      console.error("Error fetching deal details:", error);
    }
  };

  return (
    <div className={"p-4"}>
      <div>
        <div className={"flex justify-between pb-4"}>
          <h2 className={"text-3xl font-bold tracking-tight"}>Dashboard</h2>
          <Input
            className={"w-1/5"}
            placeholder="Search contracts"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          {deals
            .filter((deal: Deal) =>
              deal.code.toLowerCase().includes(filterBy.toLowerCase().trim()),
            )
            .map((deal: Deal) => (
              <Card
                key={deal.id}
                className="w-[calc(20%-12.8px)] cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
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
                <Button
                  onClick={() => handleSeeDetails(deal.id)}
                  className="mt-4"
                >
                  View Details
                </Button>
              </Card>
            ))}
        </div>
      </div>
      <DealDetailsModal
        deal={selectedDeal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
