import { env } from "@/env";
import { getServerAuthSession } from "@/server/auth";
import type Deal from "@/app/dashboard/types/Deal";

export default async function getAllDeals(): Promise<Deal[]> {
  const session = await getServerAuthSession();

  const dealsResponse = await fetch(
    env.NEXT_PUBLIC_API_URL + "/api/deals/?scenario=datatable",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${session?.user.token}`,
      },
    },
  );

  return (await dealsResponse.json()) as Deal[];
}
