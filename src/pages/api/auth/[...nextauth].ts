import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import connectMongo from '../../../lib/mongodb';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectMongo();

        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
          return { id: user._id, email: user.email };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        // セッションの処理
        // session.user!.id = token.id;
      }
      return session;
    }
  }
});