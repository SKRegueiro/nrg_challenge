import { env } from "@/env";
import { getServerAuthSession } from "@/server/auth";

export default async function getDealDetails(dealId: string) {
  const session = await getServerAuthSession();

  return await fetch(
    env.NEXT_PUBLIC_API_URL + `/api/deals/${dealId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${session?.user.token}`,
      },
    },
  );

}
