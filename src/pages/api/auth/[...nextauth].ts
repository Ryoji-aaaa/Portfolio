import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // credentials オブジェクトが存在するか確認
                if (credentials) {
                    const { email, password } = credentials;
                    // ここでユーザー認証を行う
                    if (email === "abc@example.com" && password === "password123") {
                        // 認証成功時にユーザーオブジェクトを返す
                        return { id: "001", name: 'Guest', email: "abc@example.com" };
                    }
                }
                // 認証失敗時には null を返す
                return null;
            }
        })
    ],
    callbacks: {
        session({ session, token, user }) {
            // セッションコールバックの処理
            return session;
        }
    }
});