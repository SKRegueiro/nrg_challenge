"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DealDetailsModal } from "@/app/dashboard/ui/dealDetailsModal";
import getDealDetails from "@/app/dashboard/actions/getDealDetails";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type Deal from "@/types/Deal";
import type { DealDetails } from "@/types/DealDetails";

type Counterparty = {
  id: number;
  name: string;
  type: number;
};

type Props = {
  deals: Deal[];
  counterparties: Counterparty[];
};

export default function DashboardClient({ deals, counterparties }: Props) {
  const [filterBy, setFilterBy] = useState<string>("");
  const [selectedDeal, setSelectedDeal] = useState<DealDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCounterparty, setSelectedCounterparty] = useState<string>("all");

  const handleSeeDetails = async (dealId: string) => {
    try {
      const data = await getDealDetails(dealId);
      setSelectedDeal(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching deal details:", error);
    }
  };

  const getCounterpartyType = (type: number) => {
    return type === 1 ? "Buyer" : "Seller";
  };

  const filteredDeals = deals.filter((deal: Deal) => {
    const codeMatch = deal.code.toLowerCase().includes(filterBy.toLowerCase().trim());
    const counterpartyMatch = selectedCounterparty === "all" || deal.counterparty.id.toString() === selectedCounterparty;
    return codeMatch && counterpartyMatch;
  });

  return (
    <div className="p-4">
      <div>
        <div className="flex justify-between pb-4">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex gap-4">
            <Select
              value={selectedCounterparty}
              onValueChange={(value: string) => setSelectedCounterparty(value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Counterparty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Counterparties</SelectItem>
                {counterparties.map((cp) => (
                  <SelectItem key={cp.id} value={cp.id.toString()}>
                    {cp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              className="w-[200px]"
              placeholder="Search contracts"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredDeals.map((deal: Deal) => (
            <Card
              key={deal.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
            >
              <div className="flex flex-col h-full">
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
                <div className="mt-2 flex-grow">
                  <p>Counterparty: {deal.counterparty.name}</p>
                  <p>Counterparty Type: {getCounterpartyType(counterparties.find(cp => cp.id === deal.counterparty.id)?.type ?? 0)}</p>
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
                  className="mt-4 w-full"
                >
                  View Details
                </Button>
              </div>
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
