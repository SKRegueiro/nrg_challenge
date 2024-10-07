'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { DealDetails } from "@/app/dashboard/types/DealDetails";

type DealDetailsProps = {
  deal: DealDetails | null;
  isOpen: boolean
  onClose: () => void
}

export function DealDetailsModal({ deal, isOpen, onClose }: DealDetailsProps) {
  if (!deal) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deal Details: {deal.code}</DialogTitle>
          <DialogDescription>Full information about the selected deal.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">ID:</span>
            <span>{deal.id}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Counterparty:</span>
            <span>{deal.counterparty.name} (ID: {deal.counterparty.id}, Type: {deal.counterparty.type})</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Commodity Group:</span>
            <span>{deal.commodity_group.name} ({deal.commodity_group.short_name})</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Measurement Unit:</span>
            <span>{deal.commodity_group.measurement_unit}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">DF Rounding:</span>
            <span>{deal.commodity_group.df_rounding}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Broker:</span>
            <span>{deal.broker}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Code:</span>
            <span>{deal.code}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Trade Date:</span>
            <span>{new Date(deal.trade_date).toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Status:</span>
            <Badge variant={deal.status === 2 ? "secondary" : "destructive"}>
              {deal.status === 2 ? "Verified" : "Unverified"}
            </Badge>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Proposed To:</span>
            <span>{deal.proposed_to}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Sense:</span>
            <span>{deal.sense === 2 ? "Sell" : "Buy"}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Volume:</span>
            <span>{deal.volume} {deal.commodity_group.measurement_unit}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Fixed Price:</span>
            <span>${deal.fixed_price.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Is Billing:</span>
            <span>{deal.is_billing === 1 ? "Yes" : "No"}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Is Deleted:</span>
            <span>{deal.is_deleted ? "Yes" : "No"}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Created At:</span>
            <span>{new Date(deal.created_at).toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-bold">Updated At:</span>
            <span>{new Date(deal.updated_at).toLocaleString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
