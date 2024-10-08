import type Deal from "@/types/Deal";
import getAllDeals from "@/app/dashboard/actions/getAllDeals";
import Dashboard from "./ui/dashboard";
import getAllCounterparties from "@/app/dashboard/actions/getAllCounterparties";


export default async function DashboardPage() {
  const deals: Deal[] = await getAllDeals();
  const counterparties: any[] = await getAllCounterparties();

  return <Dashboard deals={deals} counterparties={counterparties} />;
}
