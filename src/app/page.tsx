"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { logIn } from "@/app/actions/logIn";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/app/ui/submitButton";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { toast } = useToast();
  const router = useRouter();

  const formAction = async (formData: FormData) => {
    const { success, message } = await logIn(formData);

    return success
      ? router.replace("/dashboard")
      : toast({ title: "Uh! Something went wrong.", description: message });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <form action={formAction} id={"login"}>
        <Card className={"min-w-96"}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Introduce your credentials to login
            </CardDescription>
          </CardHeader>
          <CardContent className={"flex h-full w-full flex-col"}>
            <div
              className={
                "flex w-full flex-col items-center justify-around gap-6"
              }
            >
              <div className="flex w-full flex-col space-y-1.5">
                <Label htmlFor={"username"}>Username </Label>
                <Input
                  required
                  minLength={1}
                  maxLength={20}
                  id={"username"}
                  type={"text"}
                  name={"username"}
                  autoComplete={"username"}
                />
              </div>
              <div className="flex w-full flex-col space-y-1.5">
                <Label htmlFor={"password"}>Password </Label>
                <Input
                  required
                  minLength={1}
                  maxLength={20}
                  id={"password"}
                  type={"password"}
                  name={"password"}
                  autoComplete="current-password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter
            className={"flex w-full flex-col items-center justify-center"}
          >
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
