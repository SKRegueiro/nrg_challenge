import { getServerAuthSession } from "@/server/auth";
import { env } from "@/env";
import type Principal from "@/types/Principal";

export default async function getAllUsers(): Promise<Principal[]> {
  const session = await getServerAuthSession();

  const response = await fetch(
    env.NEXT_PUBLIC_API_URL + "/api/deals/principal",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${session?.user.token}`,
      },
    },
  );
  return (await response.json()) as Principal[];
}
