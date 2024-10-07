import { getServerAuthSession } from "@/server/auth";
import { env } from "@/env";
import type User from "@/types/User";

export default async function getAllUsers(): Promise<User[]> {
  const session = await getServerAuthSession();

  const response = await fetch(env.NEXT_PUBLIC_API_URL + "/api/auth/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${session?.user.token}`,
    },
  });
  return await response.json() as User[];
}
