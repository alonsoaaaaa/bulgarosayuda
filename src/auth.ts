// import NextAuth from "next-auth";
// import Facebook from "next-auth/providers/facebook";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [Facebook],
// });

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
});
