// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github"; // Example provider;
import GoogleProvider from "next-auth/providers/google";

export const OPTIONS = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "", 
    }), 
  ],
  // Add other NextAuth.js options like callbacks, session, etc.
};

export const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };