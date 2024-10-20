import { NextApiRequest, NextApiResponse } from 'next';
//UUIDを生成するライブラリ
import { v4 as uuidv4 } from 'uuid';
//Nodemailer(メール送信機能)のライブラリ
import nodemailer from 'nodemailer';

interface User {
    email: string;
    // 他のユーザー情報があればここに追加
}

const users: User[] = []; // 仮のユーザーリスト。DBに置換予定。(register.tsと同じ)
const resetTokens = new Map(); // リセットトークンを保存するマップ

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email } = req.body;
        const user = users.find(user => user.email === email);

        if (!user) {
            return res.status(404).json({ message: 'ユーザーが見つかりません' });
        }

        const token = uuidv4();
        resetTokens.set(token, email);

        // メール送信設定
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password',
            },
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'パスワードリセット',
            text: `以下のリンクをクリックしてパスワードをリセットしてください: http://localhost:3000/reset-password?token=${token}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'パスワードリセットリンクを送信しました' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};