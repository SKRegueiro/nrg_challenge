import { getServerAuthSession } from "@/server/auth";
import { env } from "@/env";

export async function GET(
  _req: Request,
  { params }: { params: { dealId: string } },
) {
  const session = await getServerAuthSession();
  const { dealId } = params

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/deals/${dealId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${session?.user.token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch deal details");
    }

    const dealDetails = await response.json();
    return new Response(JSON.stringify(dealDetails), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
