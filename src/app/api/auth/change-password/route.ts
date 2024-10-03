import { NextResponse } from "next/server";
import { getServerAuthSession } from "@/server/auth";
import { env } from "@/env";
import { z } from "zod";

const formSchema = z
  .object({
    current: z.string().min(1).max(20).trim(),
    newPassword: z.string().min(1).max(20).trim(),
    confirm: z.string().min(1).max(20).trim(),
  })
  .refine(({ confirm, newPassword }) => newPassword === confirm, {
    message: "The passwords did not match",
    path: ["confirm"],
  })
  .refine(({ newPassword, current }) => current !== newPassword, {
    message: "The new password cannot be the same as the current password",
    path: ["newPassword"],
  });

export async function POST(req: Request) {
  try {
    const session = await getServerAuthSession();
console.log(session)
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    formSchema.parse(data);

    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/auth/change_password/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${session.user.token}`,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to change password" },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues.shift()?.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, message: "An unknown error occurred" },
      { status: 500 },
    );
  }
}
