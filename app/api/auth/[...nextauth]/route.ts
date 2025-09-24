// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { pages } from "next/dist/build/templates/app-page";

const OPTIONS = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? "",
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "", 
    }), 
  ],
  pages: {}
  
  // Add other NextAuth.js options like callbacks, session, etc.
};

const handler = NextAuth(OPTIONS);
export { handler as GET, handler as POST };
