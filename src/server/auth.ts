import {
  getServerSession,
  type NextAuthOptions,
  type Session,
  type User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env";
import routes from "@/constants/routes";
import type { JWT } from "next-auth/jwt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    username: string;
    groups: number[];
    is_staff: boolean;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    groups: number[];
    is_staff: boolean;
    token: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const response = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/api/auth/login/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: "include",
            mode: "cors",
          },
        );

        // TODO: improve error handling
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }

        const user = (await response.json()) as User;
        return user || null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | null }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.groups = user.groups;
        token.is_staff = user.is_staff;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.id,
        username: token.username,
        groups: token.groups,
        is_staff: token.is_staff,
        token: token.token,
      };
      return session;
    },
  },
  pages: {
    signIn: routes.ROOT,
  },
};

/**
 * Wrapper for `getServerSession`.
 */
export const getServerAuthSession = () => getServerSession(authOptions);
