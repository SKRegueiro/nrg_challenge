import type Deal from "@/types/Deal";
import getAllDeals from "@/app/dashboard/actions/getAllDeals";
import Dashboard from "./ui/dashboard";
import getAllCounterparties from "@/app/dashboard/actions/getAllCounterparties";
import Counterparty from "@/types/Counterparty";


export default async function DashboardPage() {
  const deals: Deal[] = await getAllDeals();
  const counterparties: Counterparty[] = await getAllCounterparties();

  return <Dashboard deals={deals} counterparties={counterparties} />;
}
