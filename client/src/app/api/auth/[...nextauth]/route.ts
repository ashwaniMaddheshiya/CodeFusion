// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

// Configure NextAuth options with Credentials Provider
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        try {
          // Call your backend API to authenticate the user
          const res = await fetch("http://localhost:5000/api/user/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const user = await res.json();

          // Check if login is successful and return the user object
          if (res.ok && user) {
            return user;
          } else {
            throw new Error(user.message || "Invalid email or password");
          }
        } catch (error) {
          console.error("Error in authorize:", error);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to the token if user exists
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token data to session
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/signin", // Custom sign-in page (optional)
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
