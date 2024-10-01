import { signIn } from "next-auth/react";

export async function logIn(formData: FormData) {
  //TODO: validate form fields

  const result = await signIn("credentials", {
    username: formData.get("username"),
    password: formData.get("password"),
    redirect: false,
  });

  if (result?.error) {
    console.error("Login failed:", result.error);
    return;
  } else {
    //TODO: put to success logic
  }
}
