import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    accessToken: string;
    groups: number[];
    is_staff: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT for session
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            env.NEXT_PUBLIC_API_URL + "/api/auth/login/",
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

          if (!response.ok) {
            throw new Error("Invalid credentials");
          }

          const user = await response.json();

          if (user) {
            return user;
          }

          return null;
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.username = user.username;
        token.groups = user.groups;
        token.is_staff = user.is_staff;
      }
      return token;
    },

    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          username: token.username,
          accessToken: token.accessToken,
          groups: token.groups,
          is_staff: token.is_staff,
        },
      };
    },
  },
  pages: {
    signIn: "/", // Custom sign-in page
  },
};

/**
 * Wrapper for `getServerSession`.
 */
export const getServerAuthSession = () => getServerSession(authOptions);
