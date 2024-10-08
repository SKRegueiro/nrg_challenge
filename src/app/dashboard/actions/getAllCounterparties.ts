import { env } from "@/env";
import { getServerAuthSession } from "@/server/auth";

export default async function getAllCounterparties(): Promise<any[]> {
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

  return (await counterparties.json()) as any[];
}
