import type Deal from "@/app/dashboard/types/Deal";
import getAllDeals from "@/app/dashboard/actions/getAllDeals";
import Dashboard from "./ui/dashboard";


export default async function DashboardPage() {
  const deals: Deal[] = await getAllDeals();

  return <Dashboard deals={deals} />;
}
