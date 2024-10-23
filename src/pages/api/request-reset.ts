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

const requestReset = async (req: NextApiRequest, res: NextApiResponse) => {
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
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'パスワードリセット',
            text: `パスワードリセットトークン: ${token}`
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'リセットトークンが送信されました' });
        } catch (error) {
            res.status(500).json({ message: 'メール送信に失敗しました', error });
        }
    } else {
        res.status(405).json({ message: 'メソッドが許可されていません' });
    }
};

export default requestReset;