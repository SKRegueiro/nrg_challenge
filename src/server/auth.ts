import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env";

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

        const user = await response.json();
        return user || null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.groups = user.groups;
        token.is_staff = user.is_staff;
        token.token = user.token;
      }
      return token;
    },

    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.sub,
          username: token.username,
          groups: token.groups,
          is_staff: token.is_staff,
          token: token.token,
        },
      };
    },
  },
  pages: {
    signIn: "/",
  },
};

/**
 * Wrapper for `getServerSession`.
 */
export const getServerAuthSession = () => getServerSession(authOptions);
