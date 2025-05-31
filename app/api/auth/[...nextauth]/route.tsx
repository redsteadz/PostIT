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
        // Add to database if not already
        const url = process.env.NEXTAUTH_URL!;
        const body = {
          name: user.name,
          email: user.email,
        };
        // console.log(user);

        const resp = fetch(`${url}/api/user/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .catch((err) => console.log(err));

        return true;
      }
      return false;
    },
  },
  pages: {
    error: "/api/auth/error",
  },
});

export const { GET, POST } = handlers;
