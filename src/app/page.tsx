"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { env } from "@/env";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await fetch(env.NEXT_PUBLIC_API_URL + "/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: "include",
      mode: "cors",
    });

    if (!result.ok) {
      console.error("Login failed:", result.statusText);
      return;
    }

    const data = (await result.json()) as {
      token: string;
      id: string;
      username: string;
      is_staff: boolean;
    };
    localStorage.setItem("token", data.token);
  };

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
            onSubmit={handleSubmit}
            id={"login"}
          >
            <div
              className={
                "flex w-full flex-col items-center justify-around gap-6"
              }
            >
              <div className="flex w-full flex-col space-y-1.5">
                <Label htmlFor={"username"}>Username </Label>
                <Input
                  id={"username"}
                  type={"text"}
                  onChange={setUsername}
                  value={username}
                />
              </div>
              <div className="flex w-full flex-col space-y-1.5">
                <Label htmlFor={"password"}>Password </Label>
                <Input
                  id={"password"}
                  type={"password"}
                  onChange={setPassword}
                  value={password}
                />
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
