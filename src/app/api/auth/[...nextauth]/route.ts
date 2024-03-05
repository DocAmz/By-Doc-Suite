import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongoDB } from '@/lib/mongo/mongo';
import User from '@/lib/mongo/models/user.model';
import bcrypt from 'bcryptjs';

interface CustomSession {
  id: string;
  email: string;
  firstname: string;
  lastname: string;

}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},

      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials) {
          return null; // Return null if no credentials provided
        }

        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null; // Return null if user not found
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null; // Return null if password doesn't match
          }

          const userSession: CustomSession  = {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
          }

          // Return the user object if credentials are valid
          return userSession;
        } catch (error) {
          console.error('Error checking if user exists:', error);
          return null; // Return null if an error occurs
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET : 'secret',
  pages: {
    signIn: '/auth',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };