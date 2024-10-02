import { signIn } from "next-auth/react";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1).max(20).toLowerCase().trim(),
  password: z.string().min(1).max(20).trim(),
});

export async function logIn(formData: FormData) {
  const { success, data } = formSchema.safeParse(Object.fromEntries(formData));

  if (!success) {
    return { success: false, message: "Invalid form data" };
  }

  const result = await signIn("credentials", { ...data, redirect: false });

  if (result?.error) {
    return { success: false, message: result.error };
  } else {
    return { success: true, message: "Login Successful" };
  }
}
