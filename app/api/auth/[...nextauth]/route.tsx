export const runtime = "nodejs";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      const authorizedEmails = ["k230651@nu.edu.pk", "k230751@nu.edu.pk"];
      if (
        (profile?.email && authorizedEmails.includes(profile.email)) ||
        (user.email && authorizedEmails.includes(user.email))
      ) {
        return true;
      }
      return false;
    },
  },
});

export const { GET, POST } = handlers;
