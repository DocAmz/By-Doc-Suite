import { SessionStrategy } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},

      async authorize(credentials: Record<string, string> | undefined) {
        if (credentials && credentials.username === 'example' && credentials.password === 'password') {
          // If credentials are valid, return a user object
          return { id: '1' }; // Assuming id is of type string
        } else {
          // If credentials are invalid, return null
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET : 'secret',
  pages: {
    signIn: '/auth',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };