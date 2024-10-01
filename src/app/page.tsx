"use client";

import { Button } from "@/components/ui/button";
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

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Card className={"min-h-[400px] min-w-96"}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Introduce your credentials to login</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className={"flex h-full w-full flex-col"}
            action={logIn}
            id={"login"}
          >
            <div
              className={
                "flex w-full flex-col items-center justify-around gap-6"
              }
            >
              <div className="flex w-full flex-col space-y-1.5">
                <Label htmlFor={"username"}>Username </Label>
                <Input id={"username"} type={"text"} name={"username"} />
              </div>
              <div className="flex w-full flex-col space-y-1.5">
                <Label htmlFor={"password"}>Password </Label>
                <Input id={"password"} type={"password"} name={"password"} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter
          className={"flex w-full flex-col items-center justify-center gap-12"}
        >
          <Button form={"login"}>Press me</Button>
          <a
            className={"cursor-pointer text-blue-500 underline accent-blue-500"}
          >
            Forgot my password
          </a>
        </CardFooter>
      </Card>
    </main>
  );
}
