import NextAuth from "next-auth";
import { getServerSession } from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export const config = {
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name ?? null;
        session.user.email = token.email ?? null;
        session.user.image = token.picture ?? null;
        session.user.username = token.username ?? null;
      }
      return session;
    },
    async jwt({ token, user }) {
      const prismaUser = await prisma.user.findFirst({
        where: { email: token.email ?? undefined },
      });

      if (!prismaUser) {
        if (user?.id) token.id = user.id as string;
        return token;
      }

      if (!prismaUser.username) {
        await prisma.user.update({
          where: { id: prismaUser.id },
          data: { username: prismaUser.name?.split(" ").join("").toLowerCase() },
        });
      }

      return {
        ...token,
        id: prismaUser.id,
        name: prismaUser.name ?? token.name ?? null,
        email: prismaUser.email ?? token.email ?? null,
        username: prismaUser.username ?? null,
        picture: prismaUser.image ?? token.picture ?? null,
      };
    },
  },
} satisfies NextAuthOptions;

export default NextAuth(config);

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}