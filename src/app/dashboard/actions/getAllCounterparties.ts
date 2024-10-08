import { env } from "@/env";
import { getServerAuthSession } from "@/server/auth";
import type Counterparty from "@/types/Counterparty";

export default async function getAllCounterparties(): Promise<Counterparty[]> {
  const session = await getServerAuthSession();

  const counterparties = await fetch(
    env.NEXT_PUBLIC_API_URL + "/api/deals/counterparties",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${session?.user.token}`,
      },
    },
  );

  return (await counterparties.json()) as Counterparty[];
}
