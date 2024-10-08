import type { DealDetails } from "@/types/DealDetails";

export default async function getDealDetails(dealId: string) {
  const response = await fetch(`/api/deals/details/${dealId}`);
  return (await response.json()) as DealDetails;
}
