import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (!profile?.email) {
        throw new Error("No profile");
      }
    },
  },
};
